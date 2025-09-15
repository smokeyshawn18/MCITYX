const CACHE_NAME = "mcityx-v2";
const STATIC_CACHE = "mcityx-static-v2";
const DYNAMIC_CACHE = "mcityx-dynamic-v2";
const IMAGES_CACHE = "mcityx-images-v2";

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/favicon.ico",
  "/logo.png",
  "/logo.jpg",
  "/site.webmanifest",
  "/robots.txt",
  "/sitemap.xml",
  "/offline.html",
];

// Pages to cache for offline access
const PAGES_TO_CACHE = [
  "/",
  "/news",
  "/schedule",
  "/results",
  "/trophy-cabinet",
  "/player-card",
  "/history",
  "/lineup/create",
  "/profile",
  "/settings",
];

// Create offline fallback page
const createOfflinePage = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MCityX - Offline</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                color: white;
                margin: 0;
                padding: 20px;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            .logo {
                width: 80px;
                height: 80px;
                margin-bottom: 20px;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
            }
            h1 {
                font-size: 2rem;
                margin-bottom: 10px;
                background: linear-gradient(45deg, #3b82f6, #06b6d4);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            p {
                color: #94a3b8;
                margin-bottom: 30px;
                max-width: 400px;
                line-height: 1.6;
            }
            .retry-btn {
                background: linear-gradient(45deg, #3b82f6, #06b6d4);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .retry-btn:hover {
                transform: scale(1.05);
            }
        </style>
    </head>
    <body>
        <img src="/logo.png" alt="MCityX Logo" class="logo">
        <h1>You're Offline</h1>
        <p>Don't worry! You can still access some content while offline. Check back when you're connected to see the latest updates.</p>
        <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
    </body>
    </html>
  `;
};

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing");

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(
          [
            "/",
            "/offline.html",
            "/manifest.json",
            "/favicon.ico",
            "/logo.png",
            "/globals.css",
            "/_next/static/css/app/layout.css",
            "/_next/static/chunks/webpack.js",
            "/_next/static/chunks/main.js",
            "/_next/static/chunks/pages/_app.js",
          ].filter(Boolean)
        );
      }),

      // Cache images
      caches.open(IMAGES_CACHE).then((cache) => {
        return cache.addAll([
          "/logo.jpg",
          "/logo.png",
          "/etihad.jpg",
          "/Champ.png",
          "/carabao.png",
          "/fa-cup.jpg",
          "/cwc.webp",
          "/cwckit.jpg",
          "/awaykit.webp",
          "/firstpl.webp",
        ]);
      }),

      // Pre-cache dynamic content if available
      caches.open(DYNAMIC_CACHE).then((cache) => {
        // We'll add dynamic content as it's requested
        return Promise.resolve();
      }),
    ]).then(() => {
      console.log("Service Worker: All caches populated");
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              !cacheName.includes("mcityx-v2") &&
              cacheName !== IMAGES_CACHE
            ) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),

      // Take control of all clients immediately
      self.clients.claim(),
    ])
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Handle different types of requests
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)) {
    // Handle images with separate cache
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(IMAGES_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful GET requests (avoid caching auth tokens)
          if (response.ok && request.method === "GET") {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached API response if available
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline API message
            return new Response(
              JSON.stringify({
                error: "Offline",
                message:
                  "API not available offline. Please check your connection.",
                offline: true,
              }),
              {
                headers: { "Content-Type": "application/json" },
                status: 503,
              }
            );
          });
        })
    );
    return;
  }

  // Handle Clerk authentication requests
  if (url.hostname.includes("clerk") || url.pathname.includes("/api/auth")) {
    event.respondWith(
      fetch(request).catch(() => {
        // Don't cache auth requests, just return offline message
        return new Response(
          JSON.stringify({
            error: "Offline",
            message: "Authentication requires internet connection",
            offline: true,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 503,
          }
        );
      })
    );
    return;
  }

  // Handle navigation requests (pages)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful page responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Try to serve from cache first
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            // Try to serve similar cached pages
            const pathname = url.pathname;
            if (pathname === "/" || pathname === "/index.html") {
              return caches.match("/");
            }

            // Return offline page for navigation requests
            return caches.match("/offline.html");
          });
        })
    );
    return;
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response.ok) return response;

          const responseClone = response.clone();

          // Cache the response based on type
          if (
            url.pathname.includes("/_next/") ||
            url.pathname.includes(".css") ||
            url.pathname.includes(".js")
          ) {
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          } else {
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }

          return response;
        })
        .catch(() => {
          // For failed requests, try to return a cached version
          return caches.match(request);
        });
    })
  );
});

// Handle background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync", event.tag);

  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any offline actions that need to be synced
  console.log("Service Worker: Performing background sync");
}

// Handle push notifications (if needed in future)
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push received", event);

  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/logo.png",
      badge: "/favicon.ico",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification click received.");

  event.notification.close();

  event.waitUntil(clients.openWindow("/"));
});
