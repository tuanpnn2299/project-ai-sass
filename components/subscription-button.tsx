"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

interface SubscriptionButtonProps {
  className?: string;
  isPro?: boolean;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ isPro }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubcribe = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("");
      location.href = data.url;
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        disabled={loading}
        onClick={handleSubcribe}
        className={cn(
          "text-white w-full font-semibold hover:text-white border-none gradient-btn",
          "hover:text-white"
        )}>
        <span className="mr-2">
          {isPro ? "Manage Subscription" : "Upgrade to Pro"}
        </span>
        {!isPro && <Sparkles />}
      </Button>
    </div>
  );
};

export default SubscriptionButton;
