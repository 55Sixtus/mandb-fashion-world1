const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = 'fetch("/",{method:"POST",body:o}).then(()=>{';
const replacement = target + 'if(typeof fbq!=="undefined"){fbq("track","Lead")}if(typeof gtag!=="undefined"){gtag("event","generate_lead")}';

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync('index.html', html);
    console.log("Injected lead tracking on form success.");
} else {
    console.log("Could not find the fetch target string.");
}
