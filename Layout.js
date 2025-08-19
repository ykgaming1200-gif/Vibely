
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Search, Library, Music, Plus, Settings } from "lucide-react";
import { PlayerProvider } from "./components/player/PlayerContext";
import MusicPlayer from "./components/player/MusicPlayer";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", icon: Home, url: createPageUrl("Dashboard") },
    { name: "Search", icon: Search, url: createPageUrl("Search") },
    { name: "Library", icon: Library, url: createPageUrl("Library") },
    { name: "Playlists", icon: Music, url: createPageUrl("Playlists") },
  ];

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white overflow-hidden">
        <style>{`
          :root {
            --primary-purple: #8B5CF6;
            --accent-pink: #EC4899;
            --dark-glass: rgba(0, 0, 0, 0.3);
            --light-glass: rgba(255, 255, 255, 0.05);
          }

          .glass-effect {
            background: var(--dark-glass);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .glow-purple {
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
          }

          .text-gradient {
            background: linear-gradient(135deg, var(--primary-purple), var(--accent-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>

        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 glass-effect border-r border-white/10 flex flex-col z-10">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <h1 className="text-2xl font-bold text-gradient">SoundWave</h1>
              <p className="text-gray-400 text-sm mt-1">Premium Music Experience</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    location.pathname === item.url
                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white glow-purple"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Create Playlist */}
            <div className="p-4 border-t border-white/10">
              <Link
                to={createPageUrl("CreatePlaylist")}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 glow-purple"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Create Playlist</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="glass-effect border-b border-white/10 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{currentPageName}</h2>
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 rounded-full glass-effect hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="font-bold text-sm">U</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-auto pb-24">
              {children}
            </main>
          </div>
        </div>
        <MusicPlayer />
      </div>
    </PlayerProvider>
  );
}
