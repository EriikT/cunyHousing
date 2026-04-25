/* ============================================================
   app.js — CUNYHousing JavaScript
   Handles all the logic for searching, filtering, and
   displaying housing results on the page.
   ============================================================ */

/* ============================================================
   HOUSING DATA — sourced from NYC Open Data (NYCHA)
   Each object = one NYCHA development
   - name: development name
   - borough: used for filtering
   - zip: zip code
   - address: street address
   - units: total apartments in the development
   - rent: estimated starting rent per month
   ============================================================ */
const allData = [
  { name: "Alfred E. Smith Houses", borough: "MANHATTAN", zip: "10038", address: "70 Catherine St, Manhattan", units: 1856, rent: 750 },
  { name: "Amsterdam Houses", borough: "MANHATTAN", zip: "10023", address: "730 Amsterdam Ave, Manhattan", units: 1084, rent: 800 },
  { name: "Baruch Houses", borough: "MANHATTAN", zip: "10002", address: "605 FDR Dr, Manhattan", units: 2194, rent: 700 },
  { name: "Carver Houses", borough: "MANHATTAN", zip: "10035", address: "220 E 119th St, Manhattan", units: 1246, rent: 750 },
  { name: "Chelsea-Elliott Houses", borough: "MANHATTAN", zip: "10001", address: "430 W 26th St, Manhattan", units: 1498, rent: 850 },
  { name: "Dyckman Houses", borough: "MANHATTAN", zip: "10034", address: "3750 10th Ave, Manhattan", units: 1168, rent: 700 },
  { name: "East River Houses", borough: "MANHATTAN", zip: "10035", address: "440 E 102nd St, Manhattan", units: 1166, rent: 750 },
  { name: "Harlem River Houses", borough: "MANHATTAN", zip: "10039", address: "1 Harlem River Dr, Manhattan", units: 574, rent: 700 },
  { name: "Holmes Towers", borough: "MANHATTAN", zip: "10128", address: "515 E 93rd St, Manhattan", units: 656, rent: 900 },
  { name: "Jacob Riis Houses", borough: "MANHATTAN", zip: "10009", address: "244 Ave D, Manhattan", units: 1189, rent: 750 },
  { name: "Jefferson Houses", borough: "MANHATTAN", zip: "10029", address: "2275 First Ave, Manhattan", units: 1470, rent: 750 },
  { name: "Johnson Houses", borough: "MANHATTAN", zip: "10037", address: "1769 Madison Ave, Manhattan", units: 1310, rent: 700 },
  { name: "La Guardia Houses", borough: "MANHATTAN", zip: "10002", address: "260 Delancey St, Manhattan", units: 1102, rent: 750 },
  { name: "Lincoln Houses", borough: "MANHATTAN", zip: "10037", address: "2005 Fifth Ave, Manhattan", units: 1286, rent: 750 },
  { name: "Manhattanville Houses", borough: "MANHATTAN", zip: "10031", address: "133 Old Broadway, Manhattan", units: 1272, rent: 700 },
  { name: "Marble Hill Houses", borough: "MANHATTAN", zip: "10034", address: "5583 Broadway, Manhattan", units: 1682, rent: 750 },
  { name: "Millbrook Houses", borough: "MANHATTAN", zip: "10037", address: "153 E 132nd St, Manhattan", units: 754, rent: 750 },
  { name: "Polo Grounds Towers", borough: "MANHATTAN", zip: "10039", address: "2805 Eighth Ave, Manhattan", units: 1615, rent: 750 },
  { name: "Rutgers Houses", borough: "MANHATTAN", zip: "10002", address: "200 Madison St, Manhattan", units: 795, rent: 750 },
  { name: "Taft Houses", borough: "MANHATTAN", zip: "10029", address: "1763 Madison Ave, Manhattan", units: 916, rent: 800 },
  { name: "Wald Houses", borough: "MANHATTAN", zip: "10009", address: "281 E Houston St, Manhattan", units: 1861, rent: 750 },
  { name: "Washington Houses", borough: "MANHATTAN", zip: "10029", address: "1765 Madison Ave, Manhattan", units: 1498, rent: 750 },
  { name: "Albany Houses", borough: "BROOKLYN", zip: "11213", address: "783 Herkimer St, Brooklyn", units: 768, rent: 750 },
  { name: "Bay View Houses", borough: "BROOKLYN", zip: "11235", address: "3215 Bragg St, Brooklyn", units: 770, rent: 800 },
  { name: "Breukelen Houses", borough: "BROOKLYN", zip: "11208", address: "769 Remsen Ave, Brooklyn", units: 1595, rent: 750 },
  { name: "Brownsville Houses", borough: "BROOKLYN", zip: "11212", address: "399 Livonia Ave, Brooklyn", units: 1338, rent: 750 },
  { name: "Bushwick Houses", borough: "BROOKLYN", zip: "11221", address: "627 Bushwick Ave, Brooklyn", units: 1221, rent: 750 },
  { name: "Coney Island Houses", borough: "BROOKLYN", zip: "11224", address: "2860 W 33rd St, Brooklyn", units: 1706, rent: 750 },
  { name: "Crown Heights", borough: "BROOKLYN", zip: "11213", address: "70 Buffalo Ave, Brooklyn", units: 552, rent: 800 },
  { name: "Cypress Hills Houses", borough: "BROOKLYN", zip: "11208", address: "812 Hemlock St, Brooklyn", units: 1085, rent: 750 },
  { name: "Farragut Houses", borough: "BROOKLYN", zip: "11201", address: "228 York St, Brooklyn", units: 1390, rent: 800 },
  { name: "Gowanus Houses", borough: "BROOKLYN", zip: "11217", address: "415 Baltic St, Brooklyn", units: 1136, rent: 850 },
  { name: "Howard Houses", borough: "BROOKLYN", zip: "11212", address: "415 Dumont Ave, Brooklyn", units: 680, rent: 750 },
  { name: "Linden Houses", borough: "BROOKLYN", zip: "11207", address: "848 Linden Blvd, Brooklyn", units: 2466, rent: 750 },
  { name: "Marlboro Houses", borough: "BROOKLYN", zip: "11214", address: "2260 86th St, Brooklyn", units: 1773, rent: 750 },
  { name: "Nostrand Houses", borough: "BROOKLYN", zip: "11210", address: "1125 Nostrand Ave, Brooklyn", units: 788, rent: 800 },
  { name: "Pink Houses", borough: "BROOKLYN", zip: "11207", address: "2760 Linden Blvd, Brooklyn", units: 1500, rent: 750 },
  { name: "Red Hook East Houses", borough: "BROOKLYN", zip: "11231", address: "80 Richards St, Brooklyn", units: 1764, rent: 750 },
  { name: "Red Hook West Houses", borough: "BROOKLYN", zip: "11231", address: "62 Mill St, Brooklyn", units: 870, rent: 750 },
  { name: "Williamsburg Houses", borough: "BROOKLYN", zip: "11206", address: "168 Maujer St, Brooklyn", units: 1622, rent: 750 },
  { name: "Astoria Houses", borough: "QUEENS", zip: "11102", address: "24-20 Astoria Blvd, Queens", units: 1096, rent: 750 },
  { name: "Baisley Park Houses", borough: "QUEENS", zip: "11434", address: "11601 Sutphin Blvd, Queens", units: 1088, rent: 750 },
  { name: "Edgemere Houses", borough: "QUEENS", zip: "11691", address: "301 Beach 54th St, Queens", units: 1364, rent: 700 },
  { name: "Hammel Houses", borough: "QUEENS", zip: "11693", address: "84-30 Rockaway Beach Blvd, Queens", units: 680, rent: 750 },
  { name: "Pomonok Houses", borough: "QUEENS", zip: "11367", address: "164-04 Goethals Ave, Queens", units: 1976, rent: 750 },
  { name: "Queensbridge North Houses", borough: "QUEENS", zip: "11101", address: "10-25 41st Ave, Queens", units: 3142, rent: 700 },
  { name: "Queensbridge South Houses", borough: "QUEENS", zip: "11101", address: "12-56 41st Ave, Queens", units: 3142, rent: 700 },
  { name: "Ravenswood Houses", borough: "QUEENS", zip: "11102", address: "34-35 12th St, Queens", units: 2168, rent: 750 },
  { name: "Redfern Houses", borough: "QUEENS", zip: "11691", address: "20-10 Nameoke Ave, Queens", units: 498, rent: 750 },
  { name: "Woodside Houses", borough: "QUEENS", zip: "11377", address: "50-23 Broadway, Queens", units: 1388, rent: 800 },
  { name: "Bronx River Houses", borough: "BRONX", zip: "10460", address: "1700 Bronx River Ave, Bronx", units: 1222, rent: 700 },
  { name: "Castle Hill Houses", borough: "BRONX", zip: "10473", address: "3 Havemeyer Ave, Bronx", units: 2024, rent: 700 },
  { name: "Claremont Village", borough: "BRONX", zip: "10457", address: "767 Clay Ave, Bronx", units: 1408, rent: 700 },
  { name: "Edenwald Houses", borough: "BRONX", zip: "10466", address: "1000 E 229th St, Bronx", units: 2039, rent: 700 },
  { name: "Forest Houses", borough: "BRONX", zip: "10459", address: "1551 Elsmere Pl, Bronx", units: 1018, rent: 700 },
  { name: "Highbridge Gardens", borough: "BRONX", zip: "10452", address: "1605 Ogden Ave, Bronx", units: 704, rent: 750 },
  { name: "Jackson Houses", borough: "BRONX", zip: "10456", address: "1560 Fulton Ave, Bronx", units: 716, rent: 750 },
  { name: "Melrose Houses", borough: "BRONX", zip: "10451", address: "286 E 153rd St, Bronx", units: 1024, rent: 700 },
  { name: "Monroe Houses", borough: "BRONX", zip: "10457", address: "1975 Morris Ave, Bronx", units: 702, rent: 750 },
  { name: "Mott Haven Houses", borough: "BRONX", zip: "10454", address: "344 E 141st St, Bronx", units: 1030, rent: 700 },
  { name: "Patterson Houses", borough: "BRONX", zip: "10457", address: "402 E 143rd St, Bronx", units: 1790, rent: 700 },
  { name: "Pelham Parkway Houses", borough: "BRONX", zip: "10462", address: "1200 Pelham Pkwy S, Bronx", units: 1188, rent: 750 },
  { name: "Soundview Houses", borough: "BRONX", zip: "10473", address: "1800 Rosewater Ave, Bronx", units: 1122, rent: 700 },
  { name: "Throggs Neck Houses", borough: "BRONX", zip: "10465", address: "2040 Randall Ave, Bronx", units: 1347, rent: 750 },
  { name: "Stapleton Houses", borough: "STATEN ISLAND", zip: "10304", address: "165 Canal St, Staten Island", units: 693, rent: 850 },
  { name: "West Brighton Houses", borough: "STATEN ISLAND", zip: "10310", address: "109 Henderson Ave, Staten Island", units: 618, rent: 850 },
  { name: "Mariner's Harbor Houses", borough: "STATEN ISLAND", zip: "10303", address: "165 Continental Pl, Staten Island", units: 583, rent: 850 },
  { name: "New Brighton Houses", borough: "STATEN ISLAND", zip: "10301", address: "50 Bodine St, Staten Island", units: 326, rent: 900 },
  { name: "Park Hill Apartments", borough: "STATEN ISLAND", zip: "10304", address: "30 Park Hill Ave, Staten Island", units: 538, rent: 900 }
];

/* State variables */
let visibleCount = 12;   // How many cards to show at once
let currentResults = []; // Filtered results from last search
let studentListings = JSON.parse(localStorage.getItem('studentListings')) || [];


/* ============================================================
   NAVIGATION
   ============================================================ */

/* toggleMenu — opens/closes the mobile hamburger nav */
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('nav-mobile').classList.toggle('open');
}

/* showPage — switches between Home, Resources,Find a room and About */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a, nav button').forEach(a => a.classList.remove('active'));

  document.getElementById('page-' + page).classList.add('active');

  const desktopNav = document.getElementById('nav-' + page + '-d');
  const mobileNav = document.getElementById('nav-' + page + '-m');

  if (desktopNav) desktopNav.classList.add('active');
  if (mobileNav) mobileNav.classList.add('active');

  window.scrollTo(0, 0);
}


/* ============================================================
   FILTER INTERACTIONS
   Prevent campus and borough from both being selected at once
   ============================================================ */

/* When campus is chosen, clear the borough dropdown */
function onCampusChange() {
  if (document.getElementById('campus-select').value) {
    document.getElementById('borough-select').value = '';
  }
}

/* When borough is chosen, clear the campus dropdown */
function onBoroughChange() {
  if (document.getElementById('borough-select').value) {
    document.getElementById('campus-select').value = '';
  }
}


/* ============================================================
   SEARCH
   Reads filters, filters the data, updates the stats and results
   ============================================================ */
function search() {
  const campusEl = document.getElementById('campus-select');
  const campusBorough = campusEl.value.toUpperCase();

  // Use campus borough if selected, otherwise use borough dropdown
  const borough = campusBorough || document.getElementById('borough-select').value.toUpperCase();
  const price = document.getElementById('price-select').value;

  // Start with all data and student listings then filter down
  let results = [...allData, ...studentListings];

  // Filter by borough
  if (borough) results = results.filter(d => d.borough === borough);

  // Filter by price range
  if (price) {
    results = results.filter(d => {
      if (price === '0-800') return d.rent < 800;
      if (price === '800-1200') return d.rent >= 800 && d.rent < 1200;
      if (price === '1200-1800') return d.rent >= 1200 && d.rent < 1800;
      if (price === '1800-2500') return d.rent >= 1800 && d.rent < 2500;
      if (price === '2500+') return d.rent >= 2500;
      return true;
    });
  }

  currentResults = results;
  visibleCount = 12;

  // Calculate total units across all filtered results
  const totalUnits = results.reduce((sum, d) => sum + (d.units || 0), 0);

  // Label for the "Area searched" stat
  const areaLabel = campusBorough
    ? campusBorough.charAt(0) + campusBorough.slice(1).toLowerCase()
    : borough
      ? borough.charAt(0) + borough.slice(1).toLowerCase()
      : 'All NYC';

  // Show stats and update numbers
  document.getElementById('stats-row').style.display = 'grid';
  document.getElementById('stat-count').textContent = results.length.toLocaleString();
  document.getElementById('stat-units').textContent = totalUnits.toLocaleString();
  document.getElementById('stat-area').textContent = areaLabel;

  renderResults();
}


/* ============================================================
   RENDER RESULTS
   Builds and injects the listing card HTML into the page
   ============================================================ */
function renderResults() {
  const area = document.getElementById('results-area');

  // Show empty state if no results
  if (!currentResults.length) {
    area.innerHTML = '<div class="state-msg"><h3>No results found</h3><p>Try a different campus, borough, or price range.</p></div>';
    return;
  }

  const campusEl = document.getElementById('campus-select');
  const hasCampus = campusEl.value !== '';
  const campusName = hasCampus ? campusEl.options[campusEl.selectedIndex].text : '';

  // Only render up to visibleCount cards
  const show = currentResults.slice(0, visibleCount);

  // Build HTML for each card
  const cards = show.map(d => `
    <div class="listing-card ${d.isStudent ? 'student-post' : ''}">
      ${d.isStudent ? '<span class="badge-student">Student Listing</span>' : ''}
      <div class="listing-top">
        <div class="listing-name">${d.name}</div>
        <span class="units-badge">${d.units ? d.units.toLocaleString() + ' units' : 'Student post'}</span>
      </div>
      <div class="listing-addr">${d.address}</div>
      <div class="listing-tags">
        <span class="tag ${d.isStudent ? 'tag-campus' : 'tag-nycha'}">${d.isStudent ? 'Student Housing Lead' : 'NYCHA Affordable'}</span>
        <span class="tag tag-borough">${d.borough.charAt(0) + d.borough.slice(1).toLowerCase()}</span>
        <span class="tag tag-borough">Est. from $${d.rent}/mo</span>
        ${hasCampus ? `<span class="tag tag-campus">Near ${campusName}</span>` : ''}
      </div>
      <div class="availability-note">${d.isStudent ? 'Contact the student who posted this listing' : 'Contact development or check NYC Housing Connect for open units'}</div>
      <a href="${d.isStudent ? 'mailto:' + d.contact : ' https://housingconnect.nyc.gov/PublicWeb/auth/sign-up'}" target="_blank" class="connect-btn">
        ${d.isStudent ? 'Contact Student' : 'Check available units on NYC Housing Connect'}
      </a>
    </div>`).join('');

  // Show "Show more" button if more results exist
  const showMore = currentResults.length > visibleCount
    ? `<button class="show-more-btn" onclick="showMore()">Show more (${currentResults.length - visibleCount} remaining)</button>`
    : '';

  // Different banner for campus vs borough search
  const banner = hasCampus
    ? `<div class="campus-banner">Showing NYCHA developments and student listings in the same borough as <strong>${campusName}</strong>.</div>`
    : `<div class="info-banner">These are housing options in your area. Click any listing to check for open applications or contact information.</div>`;

  area.innerHTML = `
    ${banner}
    <div class="results-header">
      <h2>${currentResults.length} housing options found</h2>
      <span>Showing ${Math.min(visibleCount, currentResults.length)} of ${currentResults.length}</span>
    </div>
    <div class="listings-grid">${cards}</div>
    ${showMore}`;
}


/* ============================================================
   SHOW MORE
   Loads 12 more cards when button is clicked
   ============================================================ */
function showMore() {
  visibleCount += 12;
  renderResults();
}

// Handle Form Submission
document.getElementById('housingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const newPost = {
    name: document.getElementById('postTitle').value,
    borough: document.getElementById('postBorough').value,
    rent: parseInt(document.getElementById('postRent').value),
    contact: document.getElementById('postContact').value,
    address: 'Contact for full address',
    isStudent: true
  };

  studentListings.push(newPost);
  localStorage.setItem('studentListings', JSON.stringify(studentListings));

  alert('Post created!');
  this.reset();
  showPage('home');
  search(); // Refresh results
});