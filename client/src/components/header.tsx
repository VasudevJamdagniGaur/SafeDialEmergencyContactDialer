
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  showThemeToggle?: boolean;
}

export function Header({ title = "SafeDial", showThemeToggle = true }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          
          {showThemeToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
