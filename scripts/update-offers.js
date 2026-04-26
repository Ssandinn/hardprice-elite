const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function updateOffers() {
  const ofertas = [
    { name: "RTX 3060 12GB", price: 2566, store: "Amazon", type: "GPU", link: "https://amzn.to/4vTL0qv" },
    { name: "RTX 5060 8GB", price: 2490, store: "Amazon", type: "GPU", link: "https://amzn.to/42vUACw" },
    { name: "RTX 4060 8GB", price: 3399, store: "Amazon", type: "GPU", link: "https://amzn.to/4cLE3zg" },
    { name: "Ryzen 5 5600GT", price: 880, store: "Amazon", type: "CPU", link: "https://amzn.to/4d74XT1" },
    { name: "Ryzen 5 5500", price: 579, store: "Amazon", type: "CPU", link: "https://amzn.to/4eK9Cfh" },
    { name: "Ryzen 5 8500G", price: 710, store: "Amazon", type: "CPU", link: "https://amzn.to/48qWmbD" },
  ];

  await supabase.from("offers").delete().neq("id", 0);
  const { error } = await supabase.from("offers").insert(ofertas);

  if (error) throw error;

  console.log("Ofertas atualizadas:", ofertas.length);
}

updateOffers();
