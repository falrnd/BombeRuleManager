import { html, render } from 'lit-html';

const app = document.getElementById('app');

if (app) {
  const template = html`
    <main style="font-family: sans-serif; padding: 2rem;">
      <h1>[WIP] Bombe Rule Manager</h1>
      <p>Hello World</p>
    </main>
  `;
  render(template, app);
}
