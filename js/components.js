// AIBOT IYI Protocol - Shared Components System
// Tái sử dụng header, sidebar, footer across pages

class ComponentManager {
    static init() {
        this.loadHeader();
        this.loadSidebar();
        this.loadFooter();
        this.setupNavigation();
    }

    static loadHeader() {
        const headerHTML = `
            <header class="bg-black border-b border-yellow-500/20">
                <div class="container mx-auto px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <a href="index.html" title="AIBOT IYI Protocol">
                                <img src="https://aibotiyi.com/logo.svg" alt="AIBOT IYI PROTOCOL" class="h-8 w-8">
                            </a>
                            <div>
                                <h1 class="text-yellow-400 text-xl font-bold">AIBOT IYI</h1>
                                <p class="text-gray-400 text-sm">Intelligent Yield Investment</p>
                            </div>
                        </div>
                        
                        <!-- Removed horizontal nav - only using sidebar -->
                        <div class="flex items-center space-x-4">
                            <!-- Mobile Sidebar Toggle Button -->
                            <button id="mobile-sidebar-btn" class="lg:hidden text-yellow-400 hover:text-yellow-300 p-2">
                                <i class="fas fa-bars text-xl"></i>
                            </button>
                            
                            <!-- Optional: Add other header actions here -->
                            <div class="hidden lg:flex items-center space-x-4">
                                <span class="text-sm text-gray-400">Documentation</span>
                            </div>
                        </div>
                    </div>

                    <!-- Removed mobile dropdown menu - only using sidebar -->
                </div>
            </header>
        `;
        
        const headerContainer = document.getElementById('header');
        if (headerContainer) {
            headerContainer.innerHTML = headerHTML;
        }
    }

    static loadSidebar() {
        const sidebarHTML = `
            <aside class="fixed left-0 top-0 h-full w-64 bg-black/95 border-r border-yellow-500/20 transform -translate-x-full lg:translate-x-0 transition-transform z-50">
                <div class="flex flex-col h-full">
                    <!-- Logo Section -->
                    <div class="p-6 border-b border-yellow-500/20">
                        <div class="flex items-center space-x-3">
                            <a href="index.html" title="AIBOT IYI Protocol">
                                <img src="https://aibotiyi.com/logo.svg" alt="AIBOT IYI PROTOCOL" class="h-8 w-8">
                            </a>
                            <div>
                                <h2 class="text-yellow-400 font-bold">AIBOT IYI</h2>
                                <p class="text-gray-400 text-xs">Documentation</p>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Menu -->
                    <nav class="flex-1 overflow-y-auto py-6">
                        <div class="px-6 space-y-1">
                            <a href="index.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                <i class="fas fa-home w-5"></i>
                                <span>Overview</span>
                            </a>
                            
                            <a href="story.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                <i class="fas fa-book-open w-5"></i>
                                <span>Our Story</span>
                            </a>
                            
                            <div class="mt-6">
                                <h3 class="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-3">
                                    Platform
                                </h3>
                                <a href="platform.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-robot w-5"></i>
                                    <span>AI Trading</span>
                                </a>
                                <a href="gpu.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-server w-5"></i>
                                    <span>GPU Machine</span>
                                </a>
                                <a href="defi.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-coins w-5"></i>
                                    <span>DeFi Protocol</span>
                                </a>
                                <a href="platform-aib-utilities.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-microchip w-5"></i>
                                    <span>AIB Token Utilities</span>
                                </a>
                            </div>

                            <div class="mt-6">
                                <h3 class="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-3">
                                    Investment
                                </h3>
                                <a href="investments.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-chart-line w-5"></i>
                                    <span>Opportunities</span>
                                </a>
                                <a href="aibot-trading.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-robot w-5"></i>
                                    <span>AI Bot Trading</span>
                                </a>
                                <a href="affiliate-program.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-users w-5"></i>
                                    <span>Affiliate Program</span>
                                </a>
                                <a href="roi.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-calculator w-5"></i>
                                    <span>ROI Calculator</span>
                                </a>
                            </div>

                            <div class="mt-6">
                                <h3 class="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-3">
                                    AIB Token
                                </h3>
                                <a href="aib-token.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-coins w-5"></i>
                                    <span>Token Overview</span>
                                </a>
                                <a href="token-burn.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-fire w-5"></i>
                                    <span>Burn Mechanisms</span>
                                </a>
                                <a href="tokenomics.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-chart-pie w-5"></i>
                                    <span>Tokenomics</span>
                                </a>
                            </div>

                            <div class="mt-6">
                                <h3 class="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-3">
                                    About
                                </h3>
                                <a href="mission-vision.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-compass w-5"></i>
                                    <span>Mission & Vision</span>
                                </a>
                                <a href="team.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-users w-5"></i>
                                    <span>Team</span>
                                </a>
                                <a href="aib-token-utilities.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-cogs w-5"></i>
                                    <span>AIB Token Utilities</span>
                                </a>
                                <a href="roadmap.html" class="sidebar-link flex items-center space-x-3 px-3 py-2 rounded-lg">
                                    <i class="fas fa-road w-5"></i>
                                    <span>Roadmap</span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>

            <!-- Mobile Sidebar Overlay -->
            <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 lg:hidden hidden"></div>
        `;
        
        const sidebarContainer = document.getElementById('sidebar');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = sidebarHTML;
        }
    }

    static loadFooter() {
        const footerHTML = `
            <footer class="bg-black border-t border-yellow-500/20 mt-20">
                <div class="container mx-auto px-6 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div class="col-span-1 md:col-span-2">
                            <div class="flex items-center space-x-3 mb-4">
                                <a href="index.html" title="AIBOT IYI Protocol">
                                    <img src="https://aibotiyi.com/logo.svg" alt="AIBOT IYI PROTOCOL" class="h-8 w-8">
                                </a>
                                <div>
                                    <h3 class="text-yellow-400 font-bold">AIBOT IYI PROTOCOL</h3>
                                    <p class="text-gray-400 text-sm">Intelligent Yield Investment</p>
                                </div>
                            </div>
                            <p class="text-gray-400 mb-6 max-w-md">
                                Democratizing intelligent AI investment technology, creating a comprehensive ecosystem 
                                where everyone can access advanced financial tools and participate in the digital economy.
                            </p>
                            <div class="flex space-x-4">
                                <a href="https://x.com/AIBotIYI" class="social-link">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="https://t.me/AIBOTIYIOfficial" class="social-link">
                                    <i class="fab fa-telegram"></i>
                                </a>
                                <a href="https://www.youtube.com/@aibotiyi" class="social-link">
                                    <i class="fab fa-youtube"></i>
                                </a>
                                <a href="https://github.com/aibotiyi" class="social-link">
                                    <i class="fab fa-github"></i>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 class="text-white font-semibold mb-4">Platform</h4>
                            <div class="space-y-2">
                                <a href="platform.html" class="footer-link flex">AI Trading</a>
                                <a href="gpu.html" class="footer-link flex">GPU Machine</a>
                                <a href="defi.html" class="footer-link flex">DeFi Protocol</a>
                            </div>
                        </div>

                        <div>
                            <h4 class="text-white font-semibold mb-4">Resources</h4>
                            <div class="space-y-2">
                                <a href="investments.html" class="footer-link flex">Investments</a>
                                <a href="tokenomics.html" class="footer-link flex">Tokenomics</a>
                                <a href="roadmap.html" class="footer-link flex">Roadmap</a>
                                <a href="https://docs.aibotiyi.com/" class="footer-link flex">Whitepaper</a>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-yellow-500/20 mt-8 pt-6">
                        <div class="flex flex-col md:flex-row justify-between items-center">
                            <p class="text-gray-400 text-sm">
                                © 2025 AIBOT IYI Protocol. All rights reserved.
                            </p>
                            <div class="flex space-x-6 mt-4 md:mt-0">
                                <a href="https://aibotiyi.com/privacy.html" class="footer-link text-sm">Privacy Policy</a>
                                <a href="https://aibotiyi.com/terms.html" class="footer-link text-sm">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        
        const footerContainer = document.getElementById('footer');
        if (footerContainer) {
            footerContainer.innerHTML = footerHTML;
        }
    }

    static setupNavigation() {
        // Setup mobile sidebar toggle (unified system)
        this.setupMobileSidebar();

        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    static setupMobileSidebar() {
        const sidebar = document.querySelector('aside');
        const overlay = document.getElementById('sidebar-overlay');
        const headerToggle = document.getElementById('mobile-sidebar-btn');

        if (sidebar && overlay) {
            // Use header toggle button (already in DOM)
            if (headerToggle) {
                headerToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleSidebar(sidebar, overlay);
                });
            }

            // Close sidebar when clicking overlay
            overlay.addEventListener('click', () => {
                this.closeSidebar(sidebar, overlay);
            });

            // Close sidebar on navigation (sidebar links)
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.addEventListener('click', () => {
                    // Small delay to allow navigation to start
                    setTimeout(() => {
                        this.closeSidebar(sidebar, overlay);
                    }, 100);
                });
            });

            // Handle window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024) {
                    this.closeSidebar(sidebar, overlay);
                }
            });

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                const isDesktop = window.innerWidth >= 1024;
                if (!isDesktop && 
                    !sidebar.contains(e.target) && 
                    !headerToggle?.contains(e.target) && 
                    !sidebar.classList.contains('-translate-x-full')) {
                    this.closeSidebar(sidebar, overlay);
                }
            });

            // Ensure proper initial state
            this.ensureCorrectSidebarState(sidebar, overlay);
        }
    }

    static toggleSidebar(sidebar, overlay) {
        const isOpen = !sidebar.classList.contains('-translate-x-full');
        
        if (isOpen) {
            this.closeSidebar(sidebar, overlay);
        } else {
            this.openSidebar(sidebar, overlay);
        }
    }

    static openSidebar(sidebar, overlay) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    static closeSidebar(sidebar, overlay) {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    static ensureCorrectSidebarState(sidebar, overlay) {
        // Ensure proper state based on screen size
        const isDesktop = window.innerWidth >= 1024;
        
        if (isDesktop) {
            // Desktop: show sidebar, hide overlay
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        } else {
            // Mobile: hide sidebar initially
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ComponentManager.init();
});

// Export for use in other files
window.ComponentManager = ComponentManager;