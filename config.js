/**
 * CONFIGURAÇÃO DA LANDING PAGE - SEGUNDA ICPI PINHAL
 * 
 * Este arquivo foi feito para que você possa alterar as informações da igreja facilmente
 * sem precisar mexer no código HTML. Basta alterar os textos entre as aspas ("").
 */

const CHURCH_CONFIG = {
  // Nome da Igreja que aparece no topo e no rodapé
  churchName: "SEGUNDA ICPI PINHAL",
  
  // Caminho da imagem do logotipo. 
  // Dica: Quando você tiver o logo, salve-o na pasta "assets" com o nome "logo.png" (ou outro formato)
  // e mude o nome aqui abaixo se necessário (exemplo: "assets/meu-logo.png").
  logoPath: "assets/logo.png", 
  
  // Slogan ou frase de boas-vindas na página principal
  welcomeMessage: "Um lugar de recomeço, comunhão e adoração ao nosso Senhor.",
  welcomeSubtitle: "Seja muito bem-vindo à nossa comunidade! Venha nos visitar e celebrar a fé conosco.",

  // Endereço da igreja
  address: {
    street: "Rua Maria Aparecida de Souza, 123",
    neighborhood: "Centro",
    city: "Espírito Santo do Pinhal",
    state: "SP",
    zipCode: "13990-000",
    // Link do Google Maps para abrir no GPS do usuário
    mapsUrl: "https://maps.google.com/?q=Segunda+ICPI+Pinhal" 
  },

  // Redes Sociais da Igreja
  socials: {
    instagram: "https://www.instagram.com/segundaicpipinhal/", // Cole o link do Instagram aqui
    facebook: "https://www.facebook.com/segundaicpipinhal/"     // Cole o link do Facebook aqui
  },

  // PROGRAMAÇÃO DE CULTOS (Você pode alterar os horários toda semana aqui)
  // Se quiser adicionar mais cultos, basta copiar e colar um bloco completo dentro dos colchetes.
  schedules: [
    {
      day: "Domingo",
      time: "19:00",
      title: "Culto de Celebração da Família",
      description: "Momento especial de comunhão, adoração e pregação da palavra."
    },
    {
      day: "Terça-feira",
      time: "20:00",
      title: "Culto de Doutrina e Oração",
      description: "Estudo bíblico aprofundado e momento de oração comunitária."
    },
    {
      day: "Quinta-feira",
      time: "20:00",
      title: "Pequenos Grupos nos Lares (PG)",
      description: "Reuniões nos lares para edificação mútua e compartilhamento da palavra."
    }
  ],

  // CHAVES PIX (Você configurará as chaves reais abaixo)
  // A "key" é o Pix Copia e Cola completo (ou a chave de sua preferência) que será copiado.
  pix: {
    general: {
      title: "Dízimos e Ofertas (Conta Geral)",
      key: "INSIRA_AQUI_A_CHAVE_PIX_GERAL_COPIA_E_COLA", 
      owner: "Segunda Igreja Presbiteriana Conservadora de Pinhal",
      bank: "Banco Exemplo S.A.",
      qrCodePath: "assets/qr-geral.png" // Imagem do QR code que você pode gerar e colocar na pasta assets
    },
    construction: {
      title: "Campanha de Construção (Conta Separada)",
      key: "INSIRA_AQUI_A_CHAVE_PIX_CONSTRUCAO_COPIA_E_COLA",
      owner: "Segunda Igreja Presbiteriana Conservadora de Pinhal - Fundo de Obra",
      bank: "Outro Banco S.A.",
      qrCodePath: "assets/qr-construcao.png" // Imagem do QR code da conta da construção
    }
  }
};
