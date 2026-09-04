const steps = [
  {
    n: '01',
    title: 'Tell us what is moving.',
    copy: 'Share origin, destination, freight type, and timing. Photos can be sent after the quote request if needed.',
  },
  {
    n: '02',
    title: 'Receive and approve your quote.',
    copy: 'APC replies with availability and pricing. Nothing is booked until you approve the quote.',
  },
  {
    n: '03',
    title: 'APC picks it up and delivers it.',
    copy: 'The cargo van arrives, the freight is loaded, and it is delivered to the destination you specified.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-custom">
        <h2 className="headline mb-12 text-4xl text-navy md:text-5xl">How it works</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="bg-white p-7 shadow-card">
              <p className="headline mb-4 text-4xl text-primary">{step.n}</p>
              <h3 className="mb-3 text-xl font-bold text-navy">{step.title}</h3>
              <p className="text-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
