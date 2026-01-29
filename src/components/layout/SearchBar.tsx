import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic, X } from "lucide-react";

const PAGES = [
  { name: "Home", path: "/" },
  { name: "Diagnose", path: "/diagnose" },
  { name: "Marketplace", path: "/buy" },
  { name: "Market Analysis", path: "/market-analysis" },
  { name: "Recommendations", path: "/recommendations" },
  { name: "Community", path: "/community" },
  { name: "News & Blogs", path: "/blog" },
  { name: "Weather", path: "/weather" },
  { name: "Seller Panel", path: "/seller-panel" },
  { name: "Admin Panel", path: "/admin" },
  { name: "Government Schemes", path: "/government-schemes" },
];

export default function SearchBar({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof PAGES>([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  // Voice search setup
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser.');
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSearch(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleSearch = (q: string) => {
    const filtered = PAGES.filter(page =>
      page.name.toLowerCase().includes(q.toLowerCase())
    );
    setResults(filtered);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center pt-24">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 mb-4">
          <Input
            autoFocus
            placeholder="Search pages... (try voice!)"
            value={query}
            onChange={handleInput}
            className="flex-1"
            onKeyDown={e => {
              if (e.key === 'Enter' && results.length > 0) {
                handleResultClick(results[0].path);
              }
            }}
          />
          <Button size="icon" variant={listening ? "secondary" : "outline"} onClick={listening ? stopListening : startListening}>
            <Mic className={listening ? "animate-pulse text-primary" : ""} />
          </Button>
        </div>
        <div>
          {results.length === 0 && query && (
            <div className="text-muted-foreground text-sm">No results found.</div>
          )}
          <ul>
            {results.map(page => (
              <li key={page.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-1"
                  onClick={() => handleResultClick(page.path)}
                >
                  <Search className="h-4 w-4 mr-2" />
                  {page.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
