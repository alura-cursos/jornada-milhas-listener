import express, { Request } from 'express';
import server from './assets/server';
import path from 'node:path';
import { Viagem } from 'src/types/viagem';
import { Filtros } from 'src/pages/Home/types';

const app = express();

app.use('/images', express.static(path.join(__dirname, 'assets' )));

app.get('/usuarios', (req, res) => {
  res.send(server.usuarios);
})

app.get('/viagens', async (
  req: Request<{}, {}, {}, { pagina: string, limite?: string } & Partial<Filtros>>,
  res
  ) => {
  const { pagina, limite, ...filtros } = req.query;
  let viagens = server.viagens;
  if (Object.keys(filtros).length > 0) {
    viagens = viagens.filter(viagem => 
      Object.keys(filtros).every(filtro => 
        !filtros[filtro as keyof typeof filtros] || (filtros[filtro as keyof typeof filtros] === viagem[filtro as keyof typeof viagem])
      )
    );
  }
  const totalViagens = viagens.length;
  const paginaAtual = parseInt(pagina || '1');
  const limiteAtual = parseInt(limite || '5');
  const primeiraViagem = (paginaAtual - 1) * limiteAtual;
  const ultimaViagem = paginaAtual * limiteAtual;
  const results: { viagens: Viagem[], paginaAtual: number, totalPaginas: number, totalViagens: number } = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          viagens: [...viagens.slice(primeiraViagem, ultimaViagem)],
          paginaAtual,
          totalPaginas: Math.ceil(viagens.length / limiteAtual),
          totalViagens,
        }),
      2000
    )
  );
  
  res.json(results);
})

app.get('/origens', async (req, res) => {
  const results = await new Promise(resolve => 
    setTimeout(
      () => resolve([...new Set(server.viagens.map((viagem) => viagem.origem).sort())]),
      2000
    )
  );
  
  res.json(results);
})

app.get('/destinos', async (req, res) => {
  const results = await new Promise(resolve => 
    setTimeout(
      () => resolve([...new Set(server.viagens.map((viagem) => viagem.destino).sort())]),
      2000
    )
  );

  res.json(results);
})

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
})