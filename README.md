# :checkered_flag: LabDigital

O projeto é um site de Química voltada para escolas públicas, com materias disponibilizados pelos professores, banco de questões de simulados voltado para ENEM e provas, e um joguinho que anima algumas reações Químicas.

## :technologist: Membros da equipe

563639, Emilly Paiva Belo

## :bulb: Objetivo Geral
Proporcionar uma plataforma gratuita e acessível que apoie professores de escolas públicas no ensino de química, oferecendo recursos digitais interativos e ferramentas para o aprendizado efetivo dos alunos.

## :eyes: Público-Alvo
Professores e alunos de Química de escolas públicas.

## :star2: Impacto Esperado
- Democratizar o acesso a materiais didáticos de qualidade.
- Facilitar o trabalho dos professores ao centralizar recursos e ferramentas.
- Tornar o aprendizado de química mais interativo e divertido para os estudantes.
- Preparar melhor os alunos para exames e provas com simulados personalizados.
- Incentivar o uso de tecnologia no ambiente escolar.


## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Usuario não logado, aluno e professor.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

- Upload e Organização de Materiais Didáticos: Professores podem adicionar PDFs, vídeos e apresentações.
- Banco de Questões: Questões enviadas por professores que podem ser respondidas pelos alunos.
- Simulados: ALunos podem realizar simulados.
- Calendário: Calendário das proximas atividades.


## :spiral_calendar: Entidades ou tabelas do sistema

# Usuários
- username
- email
- role
- senha
  
# Materiais
- Título
- Link/Arquivo

# Questões
- Titulo
- Opcoes
- Resposta Correta

# Simulados
- usuario
- Quantidade de Questoes
- Acertos
- Data

# Calendario

- Data
- Descrição
- Status



----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Html, CSS, JS

**Backend:**

Strapi, JS


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Não logado |  |  X  |  |  |
| Aluno | X |  x  |   |   |
| Professor | X |  x  | x | x |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET |api/questoes|
| GET |api/simulados|
| GET |	api/materiais|
| GET |api/login|
| POST | api/simulados |
| POST | api/login|
| POST | api//materiais |
| DELETE | api/materiais/{documentId} |
| PUT | api/materiais/{documentId} |

