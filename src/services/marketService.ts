// Market data service using data.gov.in API
const MARKET_API_KEY = import.meta.env.VITE_MARKET_API_KEY || "";
const BASE_URL = "https://api.data.gov.in/resource";

// Agricultural Market Committee (Mandi) price data resource ID
const MANDI_PRICE_RESOURCE = "9ef84268-d588-465a-a308-a864a43d0070";

export interface MarketPrice {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  arrivalDate: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
}

export interface MarketStats {
  totalRecords: number;
  marketsRising: number;
  marketsFalling: number;
  avgPrice: number;
}

export async function fetchMarketPrices(
  commodity?: string,
  state?: string,
  limit: number = 50
): Promise<{ records: MarketPrice[]; stats: MarketStats }> {
  try {
    const params = new URLSearchParams({
      "api-key": MARKET_API_KEY,
      format: "json",
      limit: limit.toString(),
      offset: "0",
    });

    if (commodity) {
      params.append("filters[commodity]", commodity);
    }
    if (state) {
      params.append("filters[state]", state);
    }

    const url = `${BASE_URL}/${MANDI_PRICE_RESOURCE}?${params.toString()}`;
    console.log("Fetching market data from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Market API Response:", data);

    if (!data.records || data.records.length === 0) {
      return {
        records: [],
        stats: {
          totalRecords: 0,
          marketsRising: 0,
          marketsFalling: 0,
          avgPrice: 0,
        },
      };
    }

    // Transform the API response to our interface
    const records: MarketPrice[] = data.records.map((record: any) => ({
      state: record.state || "",
      district: record.district || "",
      market: record.market || "",
      commodity: record.commodity || "",
      variety: record.variety || "",
      arrivalDate: record.arrival_date || "",
      minPrice: parseFloat(record.min_price) || 0,
      maxPrice: parseFloat(record.max_price) || 0,
      modalPrice: parseFloat(record.modal_price) || 0,
    }));

    // Calculate stats
    const totalRecords = data.total || records.length;
    const avgPrice =
      records.reduce((sum, r) => sum + r.modalPrice, 0) / records.length || 0;

    // Simulate rising/falling based on price variance
    const priceVariances = records.map((r) => (r.maxPrice - r.minPrice) / r.modalPrice);
    const avgVariance = priceVariances.reduce((a, b) => a + b, 0) / priceVariances.length;
    const marketsRising = records.filter(
      (r) => (r.maxPrice - r.minPrice) / r.modalPrice > avgVariance
    ).length;
    const marketsFalling = records.length - marketsRising;

    return {
      records,
      stats: {
        totalRecords,
        marketsRising,
        marketsFalling,
        avgPrice: Math.round(avgPrice),
      },
    };
  } catch (error) {
    console.error("Market API error:", error);
    throw error;
  }
}

export async function fetchCommodities(): Promise<string[]> {
  try {
    const params = new URLSearchParams({
      "api-key": MARKET_API_KEY,
      format: "json",
      limit: "100",
    });

    const url = `${BASE_URL}/${MANDI_PRICE_RESOURCE}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract unique commodities
    const commodities = new Set<string>();
    data.records?.forEach((record: any) => {
      if (record.commodity) {
        commodities.add(record.commodity);
      }
    });

    return Array.from(commodities).sort();
  } catch (error) {
    console.error("Error fetching commodities:", error);
    return [];
  }
}

export async function fetchStates(): Promise<string[]> {
  try {
    const params = new URLSearchParams({
      "api-key": MARKET_API_KEY,
      format: "json",
      limit: "100",
    });

    const url = `${BASE_URL}/${MANDI_PRICE_RESOURCE}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract unique states
    const states = new Set<string>();
    data.records?.forEach((record: any) => {
      if (record.state) {
        states.add(record.state);
      }
    });

    return Array.from(states).sort();
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
}
