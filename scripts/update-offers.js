const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function updateOffers() {
  const ofertas = [
    { name: "RTX 3060 12GB", price: 1499, store: "Auto Bot", type: "GPU" },
    { name: "RTX 4060 8GB", price: 1899, store: "Auto Bot", type: "GPU" },
    { name: "Ryzen 5 5600", price: 599, store: "Auto Bot", type: "CPU" }
  ];

  await supabase.from("offers").delete().neq("id", 0);
  const { error } = await supabase.from("offers").insert(ofertas);

  if (error) throw error;

  console.log("Ofertas atualizadas:", ofertas.length);
}

updateOffers();
