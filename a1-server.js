const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();

const supaUrl = "https://ybjodlsigafojqpontro.supabase.co";
const supaAnonKey = "sb_publishable_vvYkOXuslpvDZ8836VnlMQ_XxFGYBAt";

const supabase = supa.createClient(supaUrl, supaAnonKey);

const jsonMessage = (msg) => {
  return { message: msg };
};

function errorCheck(data, res) {
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ message: "The requested request did not return any data" });
  }
}

app.get("/api/eras", async (req, res) => {
  const { data, error } = await supabase.from("eras").select(`*`);
  res.send(data);
});

app.get("/api/galleries", async (req, res) => {
  const { data, error } = await supabase.from("eras").select(`*`);
  res.send(data);
});

app.get("/api/galleries/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("galleries")
    .select(`*`)
    .eq("galleryId", req.params.ref);

  errorCheck(data, res);
});

app.get("/api/galleries/country/:substring", async (req, res) => {
  const { data, error } = await supabase
    .from("galleries")
    .select(`*`)
    .ilike("galleryCountry", `${req.params.substring}%`);
  errorCheck(data, res);
});

app.get("/api/artists", async (req, res) => {
  const { data, error } = await supabase.from("artists").select(`*`);
  res.send(data);
});

app.get("/api/artists/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select(`*`)
    .eq("artistId", req.params.ref);
  errorCheck(data, res);
});

app.get("/api/artists/search/:substring", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select(`*`)
    .ilike("lastName", `${req.params.substring}%`);
  errorCheck(data, res);
});

app.get("/api/artists/country/:substring", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select(`*`)
    .ilike("nationality", `${req.params.substring}%`);
  errorCheck(data, res);
});

app.get("/api/genres", async (req, res) => {
  const { data, error } = await supabase.from("genres").select(`*, eras(*)`);
  res.send(data);
});

app.get("/api/genres/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("genres")
    .select(`*, eras(*)`)
    .eq("genreID", req.params.ref);
  errorCheck(data, res);
});

app.get("/api/genres/painting/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("paintinggenres")
    .select(`genres(*, eras(*))`)
    .eq("paintingId", req.params.ref)
    .order("genres(genreName)", { ascending: false });
  errorCheck(data, res);
});

app.get("/api/paintings/single/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*`)
    .eq("paintingID", req.params.ref);
  errorCheck(data, res);
});

app.get("/api/paintings/sort/:value/limit/:ref", async (req, res) => {
  let sortBy = "title";
  let max = 1000;
  if (req.params.value === "year") {
    sortBy = "yearOfWork";
  }
  if (req.params.ref > 0) {
    max = req.params.ref;
  }

  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artists(*), galleries(*)`)
    .limit(`${max}`)
    .order(`${sortBy}`, { ascending: true });
  errorCheck(data, res);
});

app.get(
  "/api/paintings/sort/:value/limit/:ref/skip/:ref2",
  async (req, res) => {
    let sortBy = "title";
    const skip = parseInt(req.params.ref2);
    const end = parseInt(req.params.ref) + skip;

    if (req.params.value === "year") {
      sortBy = "yearOfWork";
    }
    if (skip >= 331) {
      res.send({ message: `Skip number results in no paintings` });
    } else {
      const { data, error } = await supabase
        .from("paintings")
        .select(`*, artists(*), galleries(*)`)
        .range(skip, end)
        .order(`${sortBy}`, { ascending: true });
      errorCheck(data, res);
    }
  }
);

app.get("/api/paintings/search/:substring", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artists(*), galleries(*)`)
    .ilike("title", `%${req.params.substring}%`)
    .order("yearOfWork", { ascending: true });
  errorCheck(data, res);
});

app.get("/api/paintings/years/:start/:end", async (req, res) => {
  if (parseInt(req.params.start) > parseInt(req.params.end)) {
    res.send({ message: `The end year is earlier than the start year.` });
  } else {
    const { data, error } = await supabase
      .from("paintings")
      .select(`*, artists(*), galleries(*)`)
      .gte("yearOfWork", req.params.start)
      .lte("yearOfWork", req.params.end)
      .order("yearOfWork", { ascending: true });
    errorCheck(data, res);
  }
});

app.get("/api/paintings/galleries/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artists(*), galleries(*)`)
    .eq("galleryID", req.params.ref)
    .order("yearOfWork", { ascending: true });
  errorCheck(data, res);
});

app.get("/api/paintings/artist/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artists(*), galleries(*)`)
    .eq("artistID", req.params.ref)
    .order("yearOfWork", { ascending: true });
  errorCheck(data, res);
});

app.get("/api/paintings/genre/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("paintinggenres")
    .select(
      `paintingId, paintings(title, yearOfWork, artists(*), galleries(*))`
    )
    .eq("genreId", req.params.ref)
    .order(`paintings(yearOfWork)`, { ascending: true });
  errorCheck(data, res);
});

// for embedded relation: https://supabase.com/docs/guides/database/joins-and-nesting
app.get("/api/paintings/era/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("paintinggenres")
    .select(`paintings(paintingID, title, yearOfWork), genres!inner(eraID)`)
    .eq("genres.eraID", parseInt(req.params.ref))
    .order("yearOfWork", { ascending: true, referencedTable: "paintings" });
  errorCheck(data, res);
});

// https://www.reddit.com/r/Supabase/comments/1fle465/how_do_i_select_the_count_of_a_tables_foreign/
app.get("/api/counts/genres", async (req, res) => {
  const { data, error } = await supabase
    .from("genres")
    .select(`genreName, paintinggenres(count)`);

  data.sort((a, b) => a.paintinggenres[0].count - b.paintinggenres[0].count); // least 2 most
  res.send(data);
});

app.get("/api/counts/artists", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select(`firstName, lastName, paintings(count)`);

  data.sort((a, b) => b.paintings[0].count - a.paintings[0].count); // most 2 least
  res.send(data);
});

app.get("/api/counts/topgenres/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("genres")
    .select(`genreName, paintinggenres(count)`);

  data.filter((a) => a.paintinggenres[0].count > parseInt(req.params.ref));
  data.sort((a, b) => b.paintinggenres[0].count - a.paintinggenres[0].count);
  errorCheck(data, res);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
