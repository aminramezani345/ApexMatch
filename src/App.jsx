import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Candidates from "./pages/Candidates.jsx";
import Employers from "./pages/Employers.jsx";
import Matches from "./pages/Matches.jsx";
import Groups from "./pages/Groups.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <Routes>
      {/* Landing (no sidebar) */}
      <Route path="/" element={<Home />} />

      {/* App pages with Layout */}
      <Route
        path="/candidates"
        element={
          <Layout currentPageName="Candidates">
            <Candidates />
          </Layout>
        }
      />
      <Route
        path="/employers"
        element={
          <Layout currentPageName="Employers">
            <Employers />
          </Layout>
        }
      />
      <Route
        path="/matches"
        element={
          <Layout currentPageName="Matches">
            <Matches />
          </Layout>
        }
      />
      <Route
        path="/groups"
        element={
          <Layout currentPageName="Groups">
            <Groups />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout currentPageName="Profile">
            <Profile />
          </Layout>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
