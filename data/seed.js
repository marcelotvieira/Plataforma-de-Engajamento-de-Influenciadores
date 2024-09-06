const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bcrypt = require('bcrypt');


async function main() {
  async function createUserDefault() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('123456', salt);

    await prisma.user.create({
      data: {
        nome: 'Usuário Padrão',
        email: 'default@example.com',
        senha: hashedPassword,
      },
    });

    console.log('Usuário padrão criado com sucesso.');
  }

  await createUserDefault();


  const categories = [
    "Artes",
    "Artigos de Luxo",
    "Ativismo & Causas Sociais",
    "Beleza & Maquiagem",
    "Brinquedos",
    "Carros, Motocicletas & Veiculos",
    "Casamento",
    "Ciências & Curiosidades",
    "Churrasco",
    "Construção Civil",
    "Crianças & Bebês",
    "Cultura Nerd",
    "Decoração",
    "Diversidade & Empoderamento",
    "Educação",
    "Esportes",
    "Faça Você Mesmo",
    "Família & Maternidade",
    "Fitness",
    "Finanças",
    "Games",
    "Gastronomia, Comidas, Bebidas & Receitas",
    "Humor",
    "Lifestyle",
    "Livros & Leitura",
    "Moda",
    "Música",
    "Negócios & Empreendedorismo",
    "Opinião",
    "Pets, Animais, Biologia",
    "Saúde",
    "Tecnologia",
    "Varejo",
    "Variedades",
    "Viagens",
    "Política",
    "Tv, Séries, Filmes, Cinema",
    "Direito, Advocacia",
    "Fotografia",
    "Agricultura, Rural",
    "Dança",
    "Notícias & Atualidades"
  ];

  // Seed categories
  for (const name of categories) {
    await prisma.influencerCategory.upsert({
      where: { nome: name },
      update: {},
      create: { nome: name },
    });
  }

  // Criação de um único endereço
  const endereco = await prisma.address.create({
    data: {
      cep: "12345678",
      logradouro: "Rua das Flores",
      complemento: "Apto 101",
      unidade: "1",
      bairro: "Jardim das Rosas",
      localidade: "São Paulo",
      uf: "SP",
      ibge: "3550308",
      gia: "1004",
      ddd: "11",
      siafi: "7107"
    }
  });

  const influencers = [
    {
      nome: "Laura Martins",
      email: "laura.martins@example.com",
      usernameInstagram: "laura_art",
      alcance: 60000,
      following: 1500,
      foto: "https://example.com/laura.jpg",
      categoriaNome: "Artes",
    },
    {
      nome: "Rafael Santos",
      email: "rafael.santos@example.com",
      usernameInstagram: "rafael_fitness",
      alcance: 85000,
      following: 2000,
      foto: "https://example.com/rafael.jpg",
      categoriaNome: "Fitness",
    },
    {
      nome: "Sofia Lima",
      email: "sofia.lima@example.com",
      usernameInstagram: "sofia_gastronomia",
      alcance: 72000,
      following: 1800,
      foto: "https://example.com/sofia.jpg",
      categoriaNome: "Gastronomia, Comidas, Bebidas & Receitas",
    },
    {
      nome: "Thiago Costa",
      email: "thiago.costa@example.com",
      usernameInstagram: "thiago_tech",
      alcance: 91000,
      following: 2300,
      foto: "https://example.com/thiago.jpg",
      categoriaNome: "Tecnologia",
    },
    {
      nome: "Fernanda Almeida",
      email: "fernanda.almeida@example.com",
      usernameInstagram: "fernanda_pets",
      alcance: 48000,
      following: 950,
      foto: "https://example.com/fernanda.jpg",
      categoriaNome: "Pets, Animais, Biologia",
    },
    {
      nome: "Gustavo Ribeiro",
      email: "gustavo.ribeiro@example.com",
      usernameInstagram: "gustavo_fotografia",
      alcance: 53000,
      following: 1200,
      foto: "https://example.com/gustavo.jpg",
      categoriaNome: "Fotografia",
    },
    {
      nome: "Camila Oliveira",
      email: "camila.oliveira@example.com",
      usernameInstagram: "camila_moda",
      alcance: 77000,
      following: 2100,
      foto: "https://example.com/camila.jpg",
      categoriaNome: "Moda",
    },
    {
      nome: "Lucas Ferreira",
      email: "lucas.ferreira@example.com",
      usernameInstagram: "lucas_games",
      alcance: 94000,
      following: 2600,
      foto: "https://example.com/lucas_ferreira.jpg",
      categoriaNome: "Games",
    },
    {
      nome: "Patrícia Santos",
      email: "patricia.santos@example.com",
      usernameInstagram: "patricia_saude",
      alcance: 50000,
      following: 1100,
      foto: "https://example.com/patricia.jpg",
      categoriaNome: "Saúde",
    },
    {
      nome: "Vinícius Almeida",
      email: "vinicius.almeida@example.com",
      usernameInstagram: "vinicius_lifestyle",
      alcance: 62000,
      following: 1400,
      foto: "https://example.com/vinicius.jpg",
      categoriaNome: "Lifestyle",
    },
    {
      nome: "Juliana Costa",
      email: "juliana.costa@example.com",
      usernameInstagram: "juliana_cultura",
      alcance: 39000,
      following: 800,
      foto: "https://example.com/juliana.jpg",
      categoriaNome: "Cultura Nerd",
    },
    {
      nome: "André Oliveira",
      email: "andre.oliveira@example.com",
      usernameInstagram: "andre_musica",
      alcance: 88000,
      following: 2400,
      foto: "https://example.com/andre.jpg",
      categoriaNome: "Música",
    },
    {
      nome: "Alice Souza",
      email: "alice.souza@example.com",
      usernameInstagram: "alice_souza",
      alcance: 50000,
      following: 1200,
      foto: "https://example.com/alice.jpg",
      categoriaNome: "Beleza & Maquiagem",
    },
    {
      nome: "Bruno Lima",
      email: "bruno.lima@example.com",
      usernameInstagram: "bruno_lima_fit",
      alcance: 75000,
      following: 800,
      foto: "https://example.com/bruno.jpg",
      categoriaNome: "Fitness",
    },
    {
      nome: "Clara Ribeiro",
      email: "clara.ribeiro@example.com",
      usernameInstagram: "clara.ribeiro.art",
      alcance: 32000,
      following: 500,
      foto: "https://example.com/clara.jpg",
      categoriaNome: "Artes",
    },
    {
      nome: "Diego Oliveira",
      email: "diego.oliveira@example.com",
      usernameInstagram: "diego_speed",
      alcance: 45000,
      following: 1500,
      foto: "https://example.com/diego.jpg",
      categoriaNome: "Carros, Motocicletas & Veiculos",
    },
    {
      nome: "Eduarda Martins",
      email: "eduarda.martins@example.com",
      usernameInstagram: "eduarda_gastronomia",
      alcance: 68000,
      following: 1300,
      foto: "https://example.com/eduarda.jpg",
      categoriaNome: "Gastronomia, Comidas, Bebidas & Receitas",
    },
    {
      nome: "Felipe Costa",
      email: "felipe.costa@example.com",
      usernameInstagram: "felipe_tech",
      alcance: 92000,
      following: 2100,
      foto: "https://example.com/felipe.jpg",
      categoriaNome: "Tecnologia",
    },
    {
      nome: "Gabriela Almeida",
      email: "gabriela.almeida@example.com",
      usernameInstagram: "gabriela_pets",
      alcance: 30000,
      following: 800,
      foto: "https://example.com/gabriela.jpg",
      categoriaNome: "Pets, Animais, Biologia",
    },
    {
      nome: "Henrique Silva",
      email: "henrique.silva@example.com",
      usernameInstagram: "henrique_fotografia",
      alcance: 42000,
      following: 950,
      foto: "https://example.com/henrique.jpg",
      categoriaNome: "Fotografia",
    },
    {
      nome: "Isabela Fernandes",
      email: "isabela.fernandes@example.com",
      usernameInstagram: "isabela_beleza",
      alcance: 78000,
      following: 1900,
      foto: "https://example.com/isabela.jpg",
      categoriaNome: "Beleza & Maquiagem",
    },
    {
      nome: "João Pedro Santos",
      email: "joao.pedro@example.com",
      usernameInstagram: "joao_empresario",
      alcance: 60000,
      following: 1700,
      foto: "https://example.com/joao.jpg",
      categoriaNome: "Negócios & Empreendedorismo",
    },
    {
      nome: "Karina Lopes",
      email: "karina.lopes@example.com",
      usernameInstagram: "karina_moda",
      alcance: 83000,
      following: 2200,
      foto: "https://example.com/karina.jpg",
      categoriaNome: "Moda",
    },
    {
      nome: "Lucas Almeida",
      email: "lucas.almeida@example.com",
      usernameInstagram: "lucas_gamer",
      alcance: 95000,
      following: 2500,
      foto: "https://example.com/lucas.jpg",
      categoriaNome: "Games",
    },
    {
      nome: "Mariana Cunha",
      email: "mariana.cunha@example.com",
      usernameInstagram: "mariana_cunha_saude",
      alcance: 47000,
      following: 1100,
      foto: "https://example.com/mariana.jpg",
      categoriaNome: "Saúde",
    },
    {
      nome: "Nicolas Rocha",
      email: "nicolas.rocha@example.com",
      usernameInstagram: "nicolas_rocha_lifestyle",
      alcance: 54000,
      following: 1300,
      foto: "https://example.com/nicolas.jpg",
      categoriaNome: "Lifestyle",
    },
    {
      nome: "Olivia Pereira",
      email: "olivia.pereira@example.com",
      usernameInstagram: "olivia_pereira_cultura",
      alcance: 36000,
      following: 900,
      foto: "https://example.com/olivia.jpg",
      categoriaNome: "Cultura Nerd",
    },
    {
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@example.com",
      usernameInstagram: "pedro_oliveira_music",
      alcance: 89000,
      following: 2400,
      foto: "https://example.com/pedro.jpg",
      categoriaNome: "Música",
    },
    {
      nome: "Ana Clara",
      email: "ana.clara@example.com",
      usernameInstagram: "ana_clara_artes",
      alcance: 62000,
      following: 1500,
      foto: "https://example.com/ana.jpg",
      categoriaNome: "Artes",
    },
    {
      nome: "Roberto Silva",
      email: "roberto.silva@example.com",
      usernameInstagram: "roberto_luxo",
      alcance: 85000,
      following: 2000,
      foto: "https://example.com/roberto.jpg",
      categoriaNome: "Artigos de Luxo",
    },
    {
      nome: "Claudia Mendes",
      email: "claudia.mendes@example.com",
      usernameInstagram: "claudia_ativismo",
      alcance: 70000,
      following: 1800,
      foto: "https://example.com/claudia.jpg",
      categoriaNome: "Ativismo & Causas Sociais",
    },
    {
      nome: "Fernando Costa",
      email: "fernando.costa@example.com",
      usernameInstagram: "fernando_beleza",
      alcance: 90000,
      following: 2300,
      foto: "https://example.com/fernando.jpg",
      categoriaNome: "Beleza & Maquiagem",
    },
    {
      nome: "Patrícia Lima",
      email: "patricia.lima@example.com",
      usernameInstagram: "patricia_brinquedos",
      alcance: 48000,
      following: 950,
      foto: "https://example.com/patricia_brinquedos.jpg",
      categoriaNome: "Brinquedos",
    },
    {
      nome: "Lucas Martins",
      email: "lucas.martins@example.com",
      usernameInstagram: "lucas_carros",
      alcance: 53000,
      following: 1200,
      foto: "https://example.com/lucas_carros.jpg",
      categoriaNome: "Carros, Motocicletas & Veiculos",
    },
    {
      nome: "Juliana Ferreira",
      email: "juliana.ferreira@example.com",
      usernameInstagram: "juliana_ciencias",
      alcance: 76000,
      following: 2100,
      foto: "https://example.com/juliana_ciencias.jpg",
      categoriaNome: "Ciências & Curiosidades",
    },
    {
      nome: "Thiago Almeida",
      email: "thiago.almeida@example.com",
      usernameInstagram: "thiago_churrasco",
      alcance: 82000,
      following: 2400,
      foto: "https://example.com/thiago_churrasco.jpg",
      categoriaNome: "Churrasco",
    },
  ];

  // Seed brands
  const brands = [
    {
      nome: "Marca 1",
      descricao: "Descrição da Marca 1",
      nichoNome: "Nicho 1",
    },
    {
      nome: "Marca 2",
      descricao: "Descrição da Marca 2",
      nichoNome: "Nicho 2",
    },
    {
      nome: "Marca 3",
      descricao: "Descrição da Marca 3",
      nichoNome: "Nicho 3",
    },
    {
      nome: "Marca 4",
      descricao: "Descrição da Marca 4",
      nichoNome: "Nicho 4",
    },
    {
      nome: "Marca 5",
      descricao: "Descrição da Marca 5",
      nichoNome: "Nicho 5",
    },
    {
      nome: "Marca 6",
      descricao: "Descrição da Marca 6",
      nichoNome: "Nicho 6",
    },
    {
      nome: "Marca 7",
      descricao: "Descrição da Marca 7",
      nichoNome: "Nicho 7",
    },
    {
      nome: "Marca 8",
      descricao: "Descrição da Marca 8",
      nichoNome: "Nicho 8",
    },
    {
      nome: "Marca 9",
      descricao: "Descrição da Marca 9",
      nichoNome: "Nicho 9",
    },
    {
      nome: "Marca 10",
      descricao: "Descrição da Marca 10",
      nichoNome: "Nicho 10",
    },
    {
      nome: "Marca 11",
      descricao: "Descrição da Marca 11",
      nichoNome: "Nicho 11",
    },
    {
      nome: "Marca 12",
      descricao: "Descrição da Marca 12",
      nichoNome: "Nicho 12",
    },
    {
      nome: "Marca 13",
      descricao: "Descrição da Marca 13",
      nichoNome: "Nicho 13",
    },
    {
      nome: "Marca 14",
      descricao: "Descrição da Marca 14",
      nichoNome: "Nicho 14",
    },
  ];

  // Seed brands
  let brandCount = 0
  for (const brand of brands) {

    await prisma.brand.create({
      data: {
        nome: brand.nome,
        descricao: brand.descricao,
        nicho: { connect: { nome: categories[brandCount] } }
      }
    });
    brandCount++
  }

  console.log('Marcas semeadas com sucesso.');


  // Seed influencers
  for (const influencer of influencers) {
    const category = await prisma.influencerCategory.findUnique({
      where: { nome: influencer.categoriaNome }
    });

    await prisma.influencer.create({
      data: {
        nome: influencer.nome,
        email: influencer.email,
        usernameInstagram: influencer.usernameInstagram,
        alcance: influencer.alcance,
        following: influencer.following,
        foto: influencer.foto,
        endereco: { connect: { id: endereco.id } },
        nicho: { connect: { id: category.id } }
      }
    });
  }

  console.log('Seed data inserted.');
}



main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
