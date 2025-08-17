import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createPageUrl } from '@/utils'
import { User } from '@/entities/User'
import { Users, Building2, Target, MessageSquare, UserCircle, Loader2 } from 'lucide-react'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarProvider, SidebarTrigger,
} from '@/components/ui/sidebar'

const items = [
  { title: 'Candidates', url: createPageUrl('Candidates'), icon: Users,      description: 'Manage candidate profiles' },
  { title: 'Employers',  url: createPageUrl('Employers'),  icon: Building2,  description: 'Role intake & matching' },
  { title: 'Matches',    url: createPageUrl('Matches'),    icon: Target,     description: 'View compatibility scores' },
  { title: 'Groups',     url: createPageUrl('Groups'),     icon: MessageSquare, description: 'Network & collaborate' },
]

export default function Layout({ children, currentPageName }) {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    (async () => {
      try { await User.me(); setIsAuthenticated(true) } 
      catch { setIsAuthenticated(false) }
    })()
  }, [currentPageName])

  if (isAuthenticated === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (isAuthenticated === false) {
    User.login()
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="mt-4 text-slate-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const isActive = (url) => location.pathname.startsWith(url.toLowerCase());

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="border-b p-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ApexMatch"
                className="w-14 h-14 rounded-xl ring-1 ring-slate-200 object-contain bg-white shadow-sm"
                onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
              />
              {/* wordmark (desktop only) */}
              <div className="hidden md:block">
                <h2 className="text-xl font-bold">ApexMatch</h2>
                <p className="text-xs text-slate-500">Executive Talent Platform</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="group">
                        <Link
                          to={item.url}
                          title={item.description}
                          className={`flex items-center gap-3 px-2 py-2 w-full rounded-lg transition
                            ${isActive(item.url)
                              ? "bg-slate-900 text-white ring-1 ring-slate-900"
                              : "hover:bg-slate-100"
                            }`}
                        >
                          <item.icon className={`w-4 h-4 ${isActive(item.url) ? "text-white" : ""}`} />
                          <div>
                            <span className="font-semibold text-sm">{item.title}</span>
                            <p className={`text-xs ${isActive(item.url) ? "text-slate-200" : "text-slate-500"}`}>
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="group">
                      <Link to={createPageUrl('Profile')} className={`flex items-center gap-3 px-2 py-2 w-full rounded-lg
                        ${isActive('/profile') ? "bg-slate-900 text-white ring-1 ring-slate-900" : "hover:bg-slate-100"}`}>
                        <UserCircle className={`w-4 h-4 ${isActive('/profile') ? "text-white" : ""}`} />
                        <div>
                          <span className="font-semibold text-sm">My Profile</span>
                          <p className={`text-xs ${isActive('/profile') ? "text-slate-200" : "text-slate-500"}`}>Manage your details</p>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
          <header className="border-b px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <img
                src="/logo.png"
                alt="ApexMatch"
                className="w-10 h-10 rounded ring-1 ring-slate-200 object-contain bg-white"
                onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
              />
            </div>
          </header>
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
