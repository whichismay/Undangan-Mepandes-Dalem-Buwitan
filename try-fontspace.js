import https from 'https';
import fs from 'fs';
import path from 'path';

// Let's try different paths
const ids = ['41388', '141388', '241388', '148408', '148418'];
const names = ['madelican', 'madelican-font', 'madelican-calligraphy'];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      resolve({ status: res.statusCode, headers: res.headers, url });
    }).on('error', () => {
      resolve({ status: 500, url });
    });
  });
}

async function run() {
  for (const id of ids) {
    for (const name of names) {
      const url = `https://www.fontspace.com/get/d/${id}/${name}.zip`;
      console.log('Checking:', url);
      const res = await checkUrl(url);
      console.log('Result:', res.status);
      if (res.status === 200 || res.status === 302) {
        console.log('FOUND MATCHING URL:', url, 'Headers:', res.headers);
        return;
      }
    }
  }
}

run();
