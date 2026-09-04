import { describe, expect, it } from 'vitest';
import {
  buildQuoteApiPayload,
  buildQuoteStarterHref,
  composeQuoteDetails,
  parseQuoteStarterParams,
  validateQuotePayload,
} from '../src/lib/quote';
import { NAV_LINKS, SERVICE_TYPE_VALUES, SITE } from '../src/lib/site';
import { escapeHtml } from '../src/lib/html';

describe('quote starter params', () => {
  it('maps ZIP, service, and date into the quote URL without dropping values', () => {
    const href = buildQuoteStarterHref({
      pickupZip: '02886',
      deliveryZip: '02101',
      serviceType: 'retailDelivery',
      date: '2026-09-10',
    });

    expect(href).toBe(
      '/quote?pickupZip=02886&deliveryZip=02101&serviceType=retailDelivery&date=2026-09-10'
    );

    const parsed = parseQuoteStarterParams(new URLSearchParams(href.split('?')[1]));
    expect(parsed).toEqual({
      pickupZip: '02886',
      deliveryZip: '02101',
      serviceType: 'retailDelivery',
      date: '2026-09-10',
    });
  });

  it('ignores unknown service types from the starter', () => {
    const parsed = parseQuoteStarterParams({ serviceType: 'householdGoodsMoving' });
    expect(parsed.serviceType).toBeUndefined();
  });
});

describe('quote payload contract', () => {
  it('preserves existing API field names and service type values', () => {
    const payload = buildQuoteApiPayload({
      name: 'Test User',
      email: 'test@example.com',
      phone: '4015550100',
      preferredContactMethod: 'Phone',
      serviceType: 'cargoTransport',
      pickupLocation: 'Warwick, RI',
      pickupZip: '02886',
      deliveryLocation: 'Boston, MA',
      deliveryZip: '02101',
      date: '2026-09-10',
      preferredTime: 'Morning',
      itemCategory: 'Boxes / parcels',
      quantity: '12',
      approximateWeight: '300 lbs',
      dimensions: '48x40x40',
      loadingAssistance: 'Yes — help loading',
      stairsAccess: 'Ground level / dock',
      urgency: 'Same-day if available',
      details: 'Dock closes at 3pm',
      consent: true,
    });

    expect(payload).toMatchObject({
      name: 'Test User',
      email: 'test@example.com',
      phone: '4015550100',
      serviceType: 'cargoTransport',
      pickupLocation: 'Warwick, RI',
      deliveryLocation: 'Boston, MA',
      date: '2026-09-10',
    });
    expect(payload.details).toContain('Pickup ZIP: 02886');
    expect(payload.details).toContain('Dock closes at 3pm');
    expect(SERVICE_TYPE_VALUES).toEqual(
      expect.arrayContaining([
        'residentialMoving',
        'cargoTransport',
        'junkRemoval',
        'retailDelivery',
        'localPickup',
      ])
    );
  });

  it('uses ZIP codes as locations when street address is blank', () => {
    const payload = buildQuoteApiPayload({
      name: 'A',
      email: 'a@b.com',
      phone: '1',
      preferredContactMethod: 'Email',
      serviceType: 'junkRemoval',
      pickupLocation: '',
      pickupZip: '02886',
      deliveryLocation: '',
      deliveryZip: '02888',
      date: '',
      preferredTime: '',
      itemCategory: '',
      quantity: '',
      approximateWeight: '',
      dimensions: '',
      loadingAssistance: '',
      stairsAccess: '',
      urgency: '',
      details: '',
      consent: true,
    });

    expect(payload.pickupLocation).toBe('02886');
    expect(payload.deliveryLocation).toBe('02888');
    expect(validateQuotePayload(payload)).toBeNull();
  });

  it('rejects incomplete API payloads the same way production does', () => {
    expect(validateQuotePayload({})).toBe('Missing required fields');
    expect(
      validateQuotePayload({
        name: 'A',
        email: 'a@b.com',
        phone: '1',
        serviceType: 'cargoTransport',
      })
    ).toBe('Missing required fields');
  });
});

describe('site navigation and identity', () => {
  it('keeps the specified primary nav labels', () => {
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      'Home',
      'Services',
      'Business Delivery',
      'Junk Removal',
      'About',
    ]);
  });

  it('keeps verified contact and authority details', () => {
    expect(SITE.phoneTel).toBe('+14016024943');
    expect(SITE.email).toBe('info@apcllc.co');
    expect(SITE.usdot).toBe('4402106');
    expect(SITE.mc).toBe('1728118');
    expect(SITE.city).toBe('Warwick');
  });
});

describe('html escaping', () => {
  it('escapes quote details before email interpolation', () => {
    expect(escapeHtml('<img src=x onerror=alert(1)>')).toBe(
      '&lt;img src=x onerror=alert(1)&gt;'
    );
    expect(composeQuoteDetails({
      name: '',
      email: '',
      phone: '',
      preferredContactMethod: '',
      serviceType: '',
      pickupLocation: '',
      pickupZip: '02886',
      deliveryLocation: '',
      deliveryZip: '',
      date: '',
      preferredTime: '',
      itemCategory: '',
      quantity: '',
      approximateWeight: '',
      dimensions: '',
      loadingAssistance: '',
      stairsAccess: '',
      urgency: '',
      details: 'Need liftgate',
      consent: true,
    })).toContain('Need liftgate');
  });
});
