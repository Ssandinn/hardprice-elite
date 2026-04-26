const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function updateOffers() {
  const buscas = ["placa de video 3060", "placa de video 4060", "placa de video 4070", "ryzen 5 5600", "ryzen 7 5700x"];
  let ofertas = [];

  for (const busca of buscas) {
    const res = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(busca)}`);
    const json = await res.json();

   const resultados = (json.results || []).slice(0, 3).map(item => ({
      name: item.title,
      price: Math.round(item.price),
      store: "Mercado Livre",
      type: busca.includes("Ryzen") ? "CPU" : "GPU"
    }));

    ofertas.push(...resultados);
  }

  await supabase.from("offers").delete().neq("id", 0);
  const { error } = await supabase.from("offers").insert(ofertas);

if (error) {
  console.error("Erro ao inserir:", error);
} else {
  console.log("Inserido com sucesso!");
}

  console.log("Ofertas atualizadas:", ofertas.length);
}

updateOffers();
