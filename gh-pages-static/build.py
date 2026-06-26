#!/usr/bin/env python3
"""Generate the GymTitan static site pages from a shared template."""
import os, html

OUT = os.path.join(os.path.dirname(__file__))

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="images/hero.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
</head>
<body>
<header class="site-header">
  <div class="nav">
    <a href="index.html" class="brand"><span class="bolt">⚡</span> GymTitan</a>
    <nav class="nav-links" id="nav-links">
      <a href="index.html">Home</a>
      <a href="weights.html">Weights</a>
      <a href="apparel.html">Apparel</a>
      <a href="accessories.html">Accessories</a>
      <a href="programs.html">Programs</a>
      <a href="wholesale.html">Wholesale</a>
      <a href="contact.html">Contact</a>
    </nav>
    <a href="contact.html" class="nav-cta">Shop Now</a>
    <button class="nav-toggle" aria-label="Menu">☰</button>
  </div>
</header>
<main>
"""

FOOT = """
</main>
<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <div class="brand"><span class="bolt" style="color:#E8FF3A">⚡</span> GymTitan</div>
      <p style="color:#9a9aa2;margin-top:.75rem;max-width:340px">High-voltage gear, programs and wholesale for athletes who don't quit. Dropship-ready worldwide.</p>
    </div>
    <div>
      <h5>Shop</h5>
      <a href="weights.html">Weights</a>
      <a href="apparel.html">Apparel</a>
      <a href="accessories.html">Accessories</a>
    </div>
    <div>
      <h5>Coaching</h5>
      <a href="programs.html">Programs</a>
      <a href="programs.html">Diet plans</a>
      <a href="wholesale.html">Wholesale</a>
    </div>
    <div>
      <h5>Company</h5>
      <a href="contact.html">Contact</a>
      <a href="mailto:hello@gymtitan.co">hello@gymtitan.co</a>
      <a href="#">Instagram</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© <span id="yr"></span> GymTitan. All rights reserved.</span>
    <span>Built voltage-strong ⚡</span>
  </div>
</footer>
<script>document.getElementById('yr').textContent=new Date().getFullYear();</script>
<script src="js/main.js"></script>
</body></html>
"""

def page(filename, title, desc, body):
  with open(os.path.join(OUT, filename), 'w') as f:
    f.write(HEAD.format(title=title, desc=desc) + body + FOOT)

# ---------- HOME ----------
home_body = """
<section class="hero">
  <div class="hero-bg"><img src="images/hero.jpg" alt=""></div>
  <div class="hero-content">
    <span class="eyebrow">Dropship-ready · Worldwide shipping</span>
    <h1><span class="stroke">Train like a</span><span class="volt">Titan.</span></h1>
    <p>Dumbbells, barbells, apparel, smart wearables, coaching and wholesale equipment — one electrified storefront for every athlete chasing the next rep.</p>
    <div class="hero-actions">
      <a href="weights.html" class="btn btn-primary">Shop the gear</a>
      <a href="programs.html" class="btn btn-ghost">Get a program →</a>
    </div>
  </div>
</section>

<div class="marquee"><div class="marquee-track"><span>Dropship ready</span><span>Free shipping $99+</span><span>Wholesale inquiries open</span><span>Personalized coaching</span><span>30-day gains guarantee</span></div></div>

<section class="section container">
  <span class="eyebrow">Categories</span>
  <h2>Pick your weapon.</h2>
  <p class="lead">Six arenas, one mission — make weakness extinct.</p>
  <div class="cat-grid">
    <a href="weights.html" class="cat-card"><img src="images/cat-weights.jpg" alt="Weights"><div class="cat-card-body"><h3>Weights</h3><p>Dumbbells, barbells, plate sets, kettlebells</p><span class="arrow">Shop weights →</span></div></a>
    <a href="apparel.html" class="cat-card"><img src="images/cat-apparel.jpg" alt="Apparel"><div class="cat-card-body"><h3>Apparel</h3><p>Tees, hoodies, shorts, leggings, bags</p><span class="arrow">Shop apparel →</span></div></a>
    <a href="accessories.html" class="cat-card"><img src="images/cat-accessories.jpg" alt="Accessories"><div class="cat-card-body"><h3>Accessories</h3><p>Ab rollers, yoga mats, bottles, jump ropes, smart watch</p><span class="arrow">Shop accessories →</span></div></a>
    <a href="programs.html" class="cat-card"><img src="images/cat-programs.jpg" alt="Programs"><div class="cat-card-body"><h3>Programs</h3><p>Custom training + diet built around you</p><span class="arrow">View programs →</span></div></a>
    <a href="wholesale.html" class="cat-card"><img src="images/cat-wholesale.jpg" alt="Wholesale"><div class="cat-card-body"><h3>Wholesale</h3><p>Outfit your gym with bulk equipment pricing</p><span class="arrow">Get a quote →</span></div></a>
    <a href="contact.html" class="cat-card"><img src="images/hero.jpg" alt="Merch"><div class="cat-card-body"><h3>Merch & Drops</h3><p>Limited capsule releases. Don't sleep.</p><span class="arrow">See drops →</span></div></a>
  </div>
</section>

<section class="section container">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem">
    <div class="info"><h4>⚡ Worldwide dropship</h4><p>We ship from regional fulfilment hubs so your package lands fast — wherever the gym is.</p></div>
    <div class="info"><h4>🏋️ Athlete-tested</h4><p>Every product passes our weight room before it earns a shelf in the storefront.</p></div>
    <div class="info"><h4>🛡️ 30-day guarantee</h4><p>If it doesn't level you up in 30 days, we'll take it back. No questions.</p></div>
    <div class="info"><h4>📦 Wholesale ready</h4><p>Opening a gym? Talk to us about bulk pricing on big equipment.</p></div>
  </div>
</section>
"""
page('index.html', 'GymTitan — Train Like a Titan', 'Dumbbells, barbells, apparel, smart wearables, coaching and wholesale gym equipment. Dropship-ready worldwide.', home_body)

# ---------- product page helper ----------
def product_page(filename, title, desc, eyebrow, headline, intro, products):
  cards = ""
  for p in products:
    tag = f'<span class="tag">{p["tag"]}</span>' if p.get('tag') else ''
    cards += f'''<div class="prod"><div class="prod-thumb">{p["icon"]}</div>{tag}<h4>{html.escape(p["name"])}</h4><p class="desc">{html.escape(p["desc"])}</p><div class="price">{p["price"]}</div></div>'''
  body = f'''
<section class="page-hero">
  <div class="container">
    <span class="eyebrow">{eyebrow}</span>
    <h1>{headline}</h1>
    <p>{intro}</p>
  </div>
</section>
<section class="section container">
  <div class="prod-grid">{cards}</div>
</section>'''
  page(filename, title, desc, body)

# WEIGHTS
product_page('weights.html', 'Weights — GymTitan',
  'Dumbbells, barbells, plate sets and kettlebells engineered for the long haul.',
  'Weights', '<span class="volt">Iron.</span> Always iron.',
  'Dumbbells, barbells, plate sets, kettlebells. Built for the long haul.',
  [
    {"icon":"DB","tag":"Top seller","name":"Hex Dumbbell Pair","desc":"Rubber-coated hex heads. 5–100 lb pairs.","price":"$59+"},
    {"icon":"BB","name":"Olympic Barbell 20kg","desc":"190k PSI tensile, dual knurl marks.","price":"$249"},
    {"icon":"KB","name":"Competition Kettlebell","desc":"Colour-coded steel, 8–48 kg.","price":"$79+"},
    {"icon":"PL","tag":"Bundle","name":"Bumper Plate Set","desc":"Virgin rubber, IWF spec. 160–500 lb.","price":"$329+"},
    {"icon":"AB","name":"Adjustable Dumbbells","desc":"5–52.5 lb dial-in. Pair.","price":"$429"},
    {"icon":"TB","name":"Trap / Hex Bar","desc":"Open-end design, dual handles.","price":"$199"},
    {"icon":"EZ","name":"EZ Curl Bar","desc":"Knurled grip, 25 mm sleeves.","price":"$129"},
    {"icon":"WP","name":"Weight Plate Tree","desc":"Vertical storage, 6 horns.","price":"$149"},
  ])

# APPAREL
product_page('apparel.html', 'Apparel — GymTitan',
  'Tees, hoodies, shorts, leggings and workout bags built for max-effort training.',
  'Apparel', '<span class="volt">Sweat-tested</span> kit.',
  'Drop-shoulder tees, fleece hoodies, compression shorts, high-waist leggings and bags built for the gym bag — and the street.',
  [
    {"icon":"T","tag":"New","name":"Voltage Drop Tee","desc":"180 gsm cotton, oversized cut.","price":"$34"},
    {"icon":"H","name":"Iron Fleece Hoodie","desc":"400 gsm brushed back fleece.","price":"$74"},
    {"icon":"S","name":"7\" Training Shorts","desc":"4-way stretch, hidden pocket.","price":"$42"},
    {"icon":"L","name":"High-Rise Leggings","desc":"Squat-proof, side stash pocket.","price":"$58"},
    {"icon":"TA","name":"Stringer Tank","desc":"Cut-off armholes, raw hem.","price":"$28"},
    {"icon":"JP","name":"Tech Joggers","desc":"Tapered fit, zip ankle.","price":"$64"},
    {"icon":"BG","tag":"Best for travel","name":"45L Duffel Bag","desc":"Ballistic nylon, vented shoe pocket.","price":"$89"},
    {"icon":"CP","name":"Bolt Snapback","desc":"6-panel structured, voltage badge.","price":"$26"},
  ])

# ACCESSORIES
product_page('accessories.html', 'Accessories — GymTitan',
  'Ab rollers, yoga mats, bottles, jump ropes, Bluetooth smart watch and merch.',
  'Accessories', '<span class="volt">Small gear,</span> big gains.',
  'Ab rollers, yoga mats, bottles, jump ropes, Bluetooth smart watch, and merch — the stuff that closes the gap between sets.',
  [
    {"icon":"SW","tag":"Hot drop","name":"Titan Smart Watch","desc":"Bluetooth 5.3, HR + SpO2, 14-day battery.","price":"$129"},
    {"icon":"AR","name":"Pro Ab Roller","desc":"Dual-wheel, knee pad included.","price":"$32"},
    {"icon":"YM","name":"6mm Yoga Mat","desc":"Closed-cell TPE, non-slip dual texture.","price":"$45"},
    {"icon":"BT","name":"Insulated Bottle 1L","desc":"Vacuum-sealed steel, 24h cold.","price":"$28"},
    {"icon":"JR","name":"Speed Jump Rope","desc":"Bearing handles, adjustable steel cable.","price":"$22"},
    {"icon":"RB","name":"Resistance Band Set","desc":"5 levels, 10–150 lb stack.","price":"$36"},
    {"icon":"FR","name":"Foam Roller","desc":"High-density EVA, 33 cm.","price":"$29"},
    {"icon":"WG","name":"Lifting Gloves","desc":"Padded palm, wrist wrap.","price":"$24"},
    {"icon":"SH","name":"Shaker Bottle 700ml","desc":"Leak-proof, mesh whisk.","price":"$14"},
    {"icon":"PT","tag":"Merch","name":"Voltage Poster","desc":"A2 print on 200 gsm matte.","price":"$18"},
  ])

# PROGRAMS
programs_body = """
<section class="page-hero">
  <div class="container">
    <span class="eyebrow">Coaching</span>
    <h1>Programs &amp; <span class="volt">diet plans.</span></h1>
    <p>Built around your body, schedule and goals — by coaches who actually compete.</p>
  </div>
</section>
<section class="section container">
  <div class="pricing">
    <div class="tier">
      <h3>Starter</h3>
      <div class="amount">$49<small>/mo</small></div>
      <ul><li>12-week training block</li><li>Nutrition guidelines</li><li>Exercise video library</li><li>Email support</li></ul>
      <a href="contact.html?plan=starter" class="btn btn-ghost">Choose Starter</a>
    </div>
    <div class="tier featured">
      <span class="badge">Most picked</span>
      <h3>Pro</h3>
      <div class="amount">$129<small>/mo</small></div>
      <ul><li>Fully personalized program</li><li>Macro-built meal plan</li><li>Weekly check-ins</li><li>Form-review video feedback</li><li>Direct chat with coach</li></ul>
      <a href="contact.html?plan=pro" class="btn btn-primary">Choose Pro</a>
    </div>
    <div class="tier">
      <h3>Elite</h3>
      <div class="amount">$299<small>/mo</small></div>
      <ul><li>1-on-1 weekly calls</li><li>Bloodwork + recovery review</li><li>Competition prep</li><li>Travel-friendly templates</li><li>Priority access to drops</li></ul>
      <a href="contact.html?plan=elite" class="btn btn-oxide">Choose Elite</a>
    </div>
  </div>
  <div class="divider"></div>
  <div class="info-grid">
    <div class="info"><h4>Athlete intake</h4><p>30-minute deep-dive call so the plan fits your life — not the other way round.</p></div>
    <div class="info"><h4>Macros made simple</h4><p>Weekly recipes, grocery list and macro targets so eating clean stops being a project.</p></div>
    <div class="info"><h4>Built to scale</h4><p>Programs adapt as you progress. Plateaus aren't tolerated here.</p></div>
  </div>
</section>
"""
page('programs.html', 'Programs & Diet Plans — GymTitan', 'Personalized training programs and diet plans built by coaches who compete.', programs_body)

# WHOLESALE
wholesale_body = """
<section class="page-hero">
  <div class="container">
    <span class="eyebrow">Wholesale</span>
    <h1>Outfit your <span class="volt">gym floor.</span></h1>
    <p>Racks, machines, cardio, flooring — bulk pricing for studios, garage gyms and full commercial fit-outs.</p>
  </div>
</section>
<section class="section container">
  <div class="prod-grid">
    <div class="prod"><div class="prod-thumb">PR</div><h4>Power Rack</h4><p class="desc">11-gauge steel, 1000 lb cap.</p><div class="price">From $799</div></div>
    <div class="prod"><div class="prod-thumb">CR</div><h4>Cable Crossover</h4><p class="desc">Dual stack, 200 lb each side.</p><div class="price">From $1,899</div></div>
    <div class="prod"><div class="prod-thumb">BP</div><h4>Adjustable Bench</h4><p class="desc">Commercial pad, 7 positions.</p><div class="price">From $349</div></div>
    <div class="prod"><div class="prod-thumb">TM</div><h4>Treadmill</h4><p class="desc">3 HP AC motor, 22 km/h top.</p><div class="price">From $2,499</div></div>
    <div class="prod"><div class="prod-thumb">AB</div><h4>Assault Bike</h4><p class="desc">Air resistance, 4-handle drive.</p><div class="price">From $899</div></div>
    <div class="prod"><div class="prod-thumb">RO</div><h4>Rowing Machine</h4><p class="desc">Magnetic + air dual resistance.</p><div class="price">From $1,099</div></div>
    <div class="prod"><div class="prod-thumb">FL</div><h4>Rubber Flooring</h4><p class="desc">8 mm tiles, sold per m².</p><div class="price">From $19/m²</div></div>
    <div class="prod"><div class="prod-thumb">DB</div><h4>Dumbbell Sets 5–50kg</h4><p class="desc">Rubber hex, by the pallet.</p><div class="price">From $2,999</div></div>
  </div>
  <div class="divider"></div>
  <h2 style="font-size:2rem;margin-bottom:1rem">Request a bulk quote</h2>
  <form class="form" data-mailto="wholesale@gymtitan.co" data-subject="GymTitan wholesale inquiry">
    <div class="form-row">
      <div><label for="w-name">Name</label><input id="w-name" name="Name" required></div>
      <div><label for="w-co">Company</label><input id="w-co" name="Company"></div>
    </div>
    <div class="form-row">
      <div><label for="w-email">Email</label><input id="w-email" name="Email" type="email" required></div>
      <div><label for="w-phone">Phone</label><input id="w-phone" name="Phone"></div>
    </div>
    <div><label for="w-country">Shipping country</label><input id="w-country" name="Country" required></div>
    <div><label for="w-msg">What are you outfitting?</label><textarea id="w-msg" name="Message" placeholder="e.g. 12-station functional gym, ~200 m²" required></textarea></div>
    <button class="btn btn-primary" type="submit">Send inquiry</button>
  </form>
</section>
"""
page('wholesale.html', 'Wholesale Equipment — GymTitan', 'Bulk pricing on racks, machines, cardio and flooring for gyms and studios worldwide.', wholesale_body)

# CONTACT
contact_body = """
<section class="page-hero">
  <div class="container">
    <span class="eyebrow">Contact</span>
    <h1>Talk to <span class="volt">GymTitan.</span></h1>
    <p>Support, sponsorship, press, or just a question about a product — drop us a line.</p>
  </div>
</section>
<section class="section container">
  <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:3rem" class="contact-grid">
    <form class="form" data-mailto="hello@gymtitan.co" data-subject="GymTitan contact form">
      <div class="form-row">
        <div><label for="c-name">Name</label><input id="c-name" name="Name" required></div>
        <div><label for="c-email">Email</label><input id="c-email" name="Email" type="email" required></div>
      </div>
      <div><label for="c-topic">Topic</label>
        <select id="c-topic" name="Topic"><option>Product question</option><option>Order support</option><option>Coaching</option><option>Wholesale</option><option>Press</option><option>Other</option></select>
      </div>
      <div><label for="c-msg">Message</label><textarea id="c-msg" name="Message" required></textarea></div>
      <button class="btn btn-primary" type="submit">Send message</button>
    </form>
    <div class="info-grid" style="grid-template-columns:1fr;margin-top:0">
      <div class="info"><h4>Email</h4><p>hello@gymtitan.co<br>support@gymtitan.co</p></div>
      <div class="info"><h4>Wholesale</h4><p>wholesale@gymtitan.co</p></div>
      <div class="info"><h4>Hours</h4><p>Mon–Fri · 9am–6pm GMT<br>Replies within 24h</p></div>
      <div class="info"><h4>Follow</h4><p>@gymtitan on Instagram, TikTok, YouTube</p></div>
    </div>
  </div>
</section>
<style>@media(max-width:820px){.contact-grid{grid-template-columns:1fr !important}}</style>
"""
page('contact.html', 'Contact — GymTitan', 'Support, sponsorship, wholesale and press — get in touch with GymTitan.', contact_body)

# 404
nf_body = """
<section class="page-hero" style="min-height:60vh;display:flex;align-items:center">
  <div class="container">
    <span class="eyebrow">404</span>
    <h1>Rep <span class="volt">not found.</span></h1>
    <p>This URL took a rest day. Head back to base and start a new set.</p>
    <div class="hero-actions" style="margin-top:2rem"><a href="index.html" class="btn btn-primary">Back to home</a></div>
  </div>
</section>
"""
page('404.html', '404 — GymTitan', 'Page not found.', nf_body)

print("Generated:", sorted(f for f in os.listdir(OUT) if f.endswith('.html')))
