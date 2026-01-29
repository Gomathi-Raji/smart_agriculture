import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Calendar,
  MapPin,
  AlertTriangle,
  Search,
  RefreshCw,
  Loader2
} from "lucide-react";
import { 
  fetchMarketPrices, 
  fetchCommodities, 
  fetchStates,
  MarketPrice,
  MarketStats 
} from "@/services/marketService";

export default function MarketAnalysis() {
  const [priceData, setPriceData] = useState<MarketPrice[]>([]);
  const [stats, setStats] = useState<MarketStats>({
    totalRecords: 0,
    marketsRising: 0,
    marketsFalling: 0,
    avgPrice: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commodities, setCommodities] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadMarketData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { records, stats } = await fetchMarketPrices(
        selectedCommodity || undefined,
        selectedState || undefined,
        50
      );
      setPriceData(records);
      setStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch market data");
      console.error("Market data error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const [commoditiesList, statesList] = await Promise.all([
        fetchCommodities(),
        fetchStates(),
      ]);
      setCommodities(commoditiesList);
      setStates(statesList);
    } catch (err) {
      console.error("Error loading filters:", err);
    }
  };

  useEffect(() => {
    loadFilters();
    loadMarketData();
  }, []);

  useEffect(() => {
    loadMarketData();
  }, [selectedCommodity, selectedState]);

  const filteredData = priceData.filter(
    (item) =>
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const insights = [
    {
      title: "Live Market Data",
      description: `Real-time prices from ${stats.totalRecords} market records across India via data.gov.in`,
      type: "info",
      icon: BarChart3,
    },
    {
      title: "Price Trends",
      description: `${stats.marketsRising} commodities showing upward trend, ${stats.marketsFalling} showing downward movement`,
      type: stats.marketsRising > stats.marketsFalling ? "success" : "warning",
      icon: stats.marketsRising > stats.marketsFalling ? TrendingUp : TrendingDown,
    },
    {
      title: "Average Modal Price",
      description: `Current average modal price across markets: ₹${stats.avgPrice}/quintal`,
      type: "success",
      icon: DollarSign,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Market Analysis</h1>
              <p className="text-primary-foreground/90">Real-time prices from data.gov.in</p>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={loadMarketData}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="ml-2 hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Filters */}
        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search commodity, market, district..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCommodity || "all"} onValueChange={(val) => setSelectedCommodity(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All Commodities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Commodities</SelectItem>
                  {commodities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedState || "all"} onValueChange={(val) => setSelectedState(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Market Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">{stats.marketsRising}</p>
              <p className="text-sm text-muted-foreground">Rising Prices</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-destructive">{stats.marketsFalling}</p>
              <p className="text-sm text-muted-foreground">Falling Prices</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-5 w-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">₹{stats.avgPrice}</p>
              <p className="text-sm text-muted-foreground">Avg Price/Quintal</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="h-5 w-5 text-info" />
              </div>
              <p className="text-2xl font-bold text-info">{stats.totalRecords}</p>
              <p className="text-sm text-muted-foreground">Total Records</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Prices */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Live Market Prices
              {loading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-8 text-destructive">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                <p>{error}</p>
                <Button onClick={loadMarketData} variant="outline" className="mt-4">
                  Retry
                </Button>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {loading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Loading market data...</p>
                  </div>
                ) : (
                  <p>No market data found. Try adjusting your filters.</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredData.map((item, index) => (
                  <div
                    key={`${item.market}-${item.commodity}-${index}`}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-accent/50 rounded-lg gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.commodity}</h3>
                      <p className="text-sm text-muted-foreground">{item.variety}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{item.market}, {item.district}, {item.state}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Min Price</p>
                        <p className="font-medium">₹{item.minPrice}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Modal Price</p>
                        <p className="text-lg font-bold text-primary">₹{item.modalPrice}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Max Price</p>
                        <p className="font-medium">₹{item.maxPrice}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.arrivalDate}</span>
                      </div>

                      <Badge
                        variant={
                          item.maxPrice - item.minPrice > item.modalPrice * 0.1
                            ? "destructive"
                            : "default"
                        }
                      >
                        {item.maxPrice - item.minPrice > item.modalPrice * 0.1
                          ? "Volatile"
                          : "Stable"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button variant="default" className="flex-1" onClick={loadMarketData}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
              <Button variant="outline" className="flex-1">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Charts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    insight.type === "warning"
                      ? "border-warning/20 bg-warning/5"
                      : insight.type === "success"
                      ? "border-success/20 bg-success/5"
                      : "border-info/20 bg-info/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        insight.type === "warning"
                          ? "bg-warning/20"
                          : insight.type === "success"
                          ? "bg-success/20"
                          : "bg-info/20"
                      }`}
                    >
                      <insight.icon
                        className={`h-4 w-4 ${
                          insight.type === "warning"
                            ? "text-warning"
                            : insight.type === "success"
                            ? "text-success"
                            : "text-info"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Source Attribution */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Data sourced from <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">data.gov.in</a> - Government of India Open Data Platform</p>
        </div>
      </div>
    </div>
  );
}
