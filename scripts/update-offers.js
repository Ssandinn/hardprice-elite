import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function updateOffers() {
  const busca = "RTX 3060";

  const res = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${busca}&sort=price_asc`);
  const json = await res.json();

  const ofertas = json.results.slice(0, 5).map(item => ({
    name: item.title,
    price: item.price,
    store: "Mercado Livre"
  }));

  await supabase.from("offers").delete().neq("id", 0);
  await supabase.from("offers").insert(ofertas);

  console.log("Atualizado!");
}

updateOffers();
