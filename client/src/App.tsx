import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Splash from "@/pages/splash";
import Login from "@/pages/login";
import Home from "@/pages/home";
import EmergencyDetails from "@/pages/emergency-details";
import SOSMap from "@/pages/sos-map";
import Profile from "@/pages/profile";
import TrackMe from "@/pages/trackme";
import About from "@/pages/about";

function Router() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative overflow-hidden">
      <Switch>
        <Route path="/splash" component={Splash} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
        <Route path="/emergency-details" component={EmergencyDetails} />
        <Route path="/sos-map" component={SOSMap} />
        <Route path="/profile" component={Profile} />
        <Route path="/trackme" component={TrackMe} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
