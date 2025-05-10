'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  status: string;
  emailStatus: string;
  message?: string;
  serviceType?: string;
  serviceTypeDisplay?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  date?: string;
  details?: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [contactSubmissions, setContactSubmissions] = useState<FormSubmission[]>([]);
  const [quoteSubmissions, setQuoteSubmissions] = useState<FormSubmission[]>([]);
  const [activeTab, setActiveTab] = useState('contacts');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [contactPagination, setContactPagination] = useState<PaginationData>({ total: 0, page: 1, limit: 50, pages: 0 });
  const [quotePagination, setQuotePagination] = useState<PaginationData>({ total: 0, page: 1, limit: 50, pages: 0 });
  const router = useRouter();

  const correctPassword = 'apcllc2024admin'; // In production, use environment variables or proper auth

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      // Store auth in localStorage
      localStorage.setItem('apcllc_admin_auth', JSON.stringify({ authenticated: true, timestamp: Date.now() }));
      // Generate API key for API calls
      const generatedApiKey = 'apcllc2024adminapi';
      setApiKey(generatedApiKey);
      localStorage.setItem('apcllc_admin_api_key', generatedApiKey);
      fetchSubmissions();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchSubmissions = async () => {
    if (!apiKey) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Fetch contact submissions
      const contactResponse = await fetch(`/api/admin/contacts?page=${contactPagination.page}&limit=${contactPagination.limit}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!contactResponse.ok) {
        throw new Error(`Failed to fetch contact submissions: ${contactResponse.status}`);
      }
      
      const contactData = await contactResponse.json();
      setContactSubmissions(contactData.submissions || []);
      setContactPagination(contactData.pagination || { total: 0, page: 1, limit: 50, pages: 0 });
      
      // Fetch quote submissions
      const quoteResponse = await fetch(`/api/admin/quotes?page=${quotePagination.page}&limit=${quotePagination.limit}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!quoteResponse.ok) {
        throw new Error(`Failed to fetch quote submissions: ${quoteResponse.status}`);
      }
      
      const quoteData = await quoteResponse.json();
      setQuoteSubmissions(quoteData.submissions || []);
      setQuotePagination(quoteData.pagination || { total: 0, page: 1, limit: 50, pages: 0 });
      
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to fetch submissions. Please check your connection or reload the page.');
      
      // If database not available yet, use sample data
      setContactSubmissions([
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-123-4567',
          message: 'I need help with a delivery',
          createdAt: new Date().toISOString(),
          status: 'new',
          emailStatus: 'sent'
        }
      ]);
      
      setQuoteSubmissions([
        {
          _id: '1',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '555-987-6543',
          serviceType: 'residentialMoving',
          serviceTypeDisplay: 'Residential Moving',
          pickupLocation: '123 Main St',
          deliveryLocation: '456 Oak Ave',
          date: '2024-06-15',
          details: 'Need to move a 3 bedroom house',
          createdAt: new Date().toISOString(),
          status: 'new',
          emailStatus: 'sent'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = (tab: string, newPage: number) => {
    if (tab === 'contacts') {
      setContactPagination({...contactPagination, page: newPage});
    } else {
      setQuotePagination({...quotePagination, page: newPage});
    }
    // Refetch with new page
    fetchSubmissions();
  };

  // Check for existing authentication on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('apcllc_admin_auth');
    const storedApiKey = localStorage.getItem('apcllc_admin_api_key');
    
    if (storedAuth && storedApiKey) {
      try {
        const auth = JSON.parse(storedAuth);
        // Check if auth was within the last 24 hours
        if (auth.authenticated && Date.now() - auth.timestamp < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
          setApiKey(storedApiKey);
        }
      } catch (e) {
        localStorage.removeItem('apcllc_admin_auth');
        localStorage.removeItem('apcllc_admin_api_key');
      }
    }
  }, []);

  // Fetch submissions whenever apiKey is set
  useEffect(() => {
    if (apiKey) {
      fetchSubmissions();
    }
  }, [apiKey, fetchSubmissions]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setApiKey(null);
    localStorage.removeItem('apcllc_admin_auth');
    localStorage.removeItem('apcllc_admin_api_key');
    router.push('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderPagination = (tab: string) => {
    const pagination = tab === 'contacts' ? contactPagination : quotePagination;
    if (pagination.pages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-6">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => changePage(tab, Math.max(pagination.page - 1, 1))}
            disabled={pagination.page === 1}
            className={`px-4 py-2 text-sm font-medium ${
              pagination.page === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } rounded-l-md border border-gray-300`}
          >
            Previous
          </button>
          
          {[...Array(pagination.pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => changePage(tab, i + 1)}
              className={`px-4 py-2 text-sm font-medium ${
                pagination.page === i + 1
                  ? 'bg-[#c62a2a] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => changePage(tab, Math.min(pagination.page + 1, pagination.pages))}
            disabled={pagination.page === pagination.pages}
            className={`px-4 py-2 text-sm font-medium ${
              pagination.page === pagination.pages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } rounded-r-md border border-gray-300`}
          >
            Next
          </button>
        </nav>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">APC LLC Admin</h1>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#c62a2a] hover:bg-[#a52222] text-white font-semibold py-2 px-4 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#c62a2a] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">APC LLC Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-[#c62a2a] px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 ${activeTab === 'contacts' ? 'border-b-2 border-[#c62a2a] text-[#c62a2a] font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('contacts')}
            >
              Contact Form Submissions
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'quotes' ? 'border-b-2 border-[#c62a2a] text-[#c62a2a] font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('quotes')}
            >
              Quote Requests
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Form Submissions</h2>
                {contactSubmissions.length === 0 ? (
                  <p className="text-gray-500">No contact form submissions yet.</p>
                ) : (
                  <>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {contactSubmissions.map((submission) => (
                            <tr key={submission._id}>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.phone}</td>
                              <td className="px-6 py-4">{submission.message?.substring(0, 50)}{submission.message && submission.message.length > 50 ? '...' : ''}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{formatDate(submission.createdAt)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  submission.status === 'new' ? 'bg-green-100 text-green-800' : 
                                  submission.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {submission.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {renderPagination('contacts')}
                  </>
                )}
              </div>
            )}

            {activeTab === 'quotes' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Quote Requests</h2>
                {quoteSubmissions.length === 0 ? (
                  <p className="text-gray-500">No quote requests yet.</p>
                ) : (
                  <>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {quoteSubmissions.map((submission) => (
                            <tr key={submission._id}>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.phone}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.serviceTypeDisplay}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.pickupLocation}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.deliveryLocation}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{submission.date || 'Not specified'}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{formatDate(submission.createdAt)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  submission.status === 'new' ? 'bg-green-100 text-green-800' : 
                                  submission.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {submission.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {renderPagination('quotes')}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 