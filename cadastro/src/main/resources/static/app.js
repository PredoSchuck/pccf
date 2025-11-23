// app.js - frontend CRUD simples para /api/pessoas e /api/usuarios
const apiBase = '' // same origin; if API in different port, set full URL e.g. 'http://localhost:8080'

// Tab handling
document.getElementById('tab-pessoas').addEventListener('click', ()=> showTab('pessoas'));
document.getElementById('tab-usuarios').addEventListener('click', ()=> showTab('usuarios'));

function showTab(tab){
  document.getElementById('tab-pessoas').classList.toggle('active', tab==='pessoas');
  document.getElementById('tab-usuarios').classList.toggle('active', tab==='usuarios');
  document.getElementById('pessoas-section').classList.toggle('active', tab==='pessoas');
  document.getElementById('usuarios-section').classList.toggle('active', tab==='usuarios');
}

// Pessoas logic
const pessoaForm = document.getElementById('pessoa-form');
const pessoaTableBody = document.querySelector('#pessoa-table tbody');
const pessoaSearchInput = document.getElementById('pessoa-search');

pessoaForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = document.getElementById('pessoa-id').value;
  const payload = {
    nome: document.getElementById('pessoa-nome').value,
    cpf: document.getElementById('pessoa-cpf').value,
    telefone: document.getElementById('pessoa-telefone').value
  };
  if(id){
    await fetch(apiBase + '/api/pessoas/' + id, {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  } else {
    await fetch(apiBase + '/api/pessoas', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  }
  pessoaForm.reset();
  loadPessoas();
});

document.getElementById('pessoa-cancel').addEventListener('click', ()=> pessoaForm.reset());
document.getElementById('pessoa-refresh').addEventListener('click', ()=> loadPessoas());
document.getElementById('pessoa-search-btn').addEventListener('click', ()=> loadPessoas(pessoaSearchInput.value));

async function loadPessoas(nome){
  let url = apiBase + '/api/pessoas';
  if(nome) url += '?nome=' + encodeURIComponent(nome);
  const res = await fetch(url);
  const list = await res.json();
  pessoaTableBody.innerHTML = '';
  list.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.id||''}</td><td>${p.nome||''}</td><td>${p.cpf||''}</td><td>${p.telefone||''}</td>
      <td class="actions">
        <button onclick="editPessoa(${p.id})">Editar</button>
        <button onclick="deletePessoa(${p.id})" class="small">Excluir</button>
      </td>`;
    pessoaTableBody.appendChild(tr);
  });
}

window.editPessoa = async function(id){
  const res = await fetch(apiBase + '/api/pessoas/' + id);
  if(!res.ok) return alert('Pessoa não encontrada');
  const p = await res.json();
  document.getElementById('pessoa-id').value = p.id;
  document.getElementById('pessoa-nome').value = p.nome || '';
  document.getElementById('pessoa-cpf').value = p.cpf || '';
  document.getElementById('pessoa-telefone').value = p.telefone || '';
  showTab('pessoas');
}

window.deletePessoa = async function(id){
  if(!confirm('Confirma exclusão?')) return;
  await fetch(apiBase + '/api/pessoas/' + id, {method:'DELETE'});
  loadPessoas();
}

// Usuarios logic
const usuarioForm = document.getElementById('usuario-form');
const usuarioTableBody = document.querySelector('#usuario-table tbody');

usuarioForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = document.getElementById('usuario-id').value;
  const payload = {
    usuario: document.getElementById('usuario-nome').value,
    senha: document.getElementById('usuario-senha').value
  };
  if(id){
    await fetch(apiBase + '/api/usuarios/' + id, {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  } else {
    await fetch(apiBase + '/api/usuarios', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  }
  usuarioForm.reset();
  loadUsuarios();
});

document.getElementById('usuario-cancel').addEventListener('click', ()=> usuarioForm.reset());
document.getElementById('usuario-refresh').addEventListener('click', ()=> loadUsuarios());
document.getElementById('usuario-search-btn').addEventListener('click', ()=> loadUsuarios(document.getElementById('usuario-search').value));

async function loadUsuarios(nome){
  const res = await fetch(apiBase + '/api/usuarios');
  const list = await res.json();
  usuarioTableBody.innerHTML = '';
  list.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.id||''}</td><td>${u.usuario||''}</td>
      <td class="actions">
        <button onclick="editUsuario(${u.id})">Editar</button>
        <button onclick="deleteUsuario(${u.id})" class="small">Excluir</button>
      </td>`;
    usuarioTableBody.appendChild(tr);
  });
}

window.editUsuario = async function(id){
  const res = await fetch(apiBase + '/api/usuarios/' + id);
  if(!res.ok) return alert('Usuário não encontrado');
  const u = await res.json();
  document.getElementById('usuario-id').value = u.id;
  document.getElementById('usuario-nome').value = u.usuario || '';
  document.getElementById('usuario-senha').value = u.senha || '';
  showTab('usuarios');
}

window.deleteUsuario = async function(id){
  if(!confirm('Confirma exclusão?')) return;
  await fetch(apiBase + '/api/usuarios/' + id, {method:'DELETE'});
  loadUsuarios();
}

// initial load
loadPessoas();
loadUsuarios();