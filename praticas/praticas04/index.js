import express from 'express';

let tarefas = [
  { id: 1, descricao: 'Estudar Node.js', concluida: false },
  { id: 2, descricao: 'Fazer prática de Express', concluida: true }
];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const tarefasRouter = express.Router();

tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});

tarefasRouter.post('/', (req, res) => {
  const { descricao, concluida = false } = req.body;
  const novaTarefa = {
    id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
    descricao,
    concluida
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

const encontrarTarefaPorId = (id) => {
  return tarefas.find(t => t.id === parseInt(id));
};

tarefasRouter.get('/:tarefaId', (req, res, next) => {
  const tarefa = encontrarTarefaPorId(req.params.tarefaId);
  if (!tarefa) {
    const erro = new Error('Tarefa não localizada');
    next(erro);
    return;
  }
  res.json(tarefa);
});

tarefasRouter.put('/:tarefaId', (req, res, next) => {
  const tarefa = encontrarTarefaPorId(req.params.tarefaId);
  if (!tarefa) {
    const erro = new Error('Tarefa não localizada');
    next(erro);
    return;
  }
  
  const { descricao, concluida } = req.body;
  if (descricao !== undefined) tarefa.descricao = descricao;
  if (concluida !== undefined) tarefa.concluida = concluida;
  
  res.json(tarefa);
});

tarefasRouter.delete('/:tarefaId', (req, res, next) => {
  const index = tarefas.findIndex(t => t.id === parseInt(req.params.tarefaId));
  if (index === -1) {
    const erro = new Error('Tarefa não localizada');
    next(erro);
    return;
  }
  
  tarefas.splice(index, 1);
  res.status(204).send();
});

app.use('/tarefas', tarefasRouter);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(400).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;