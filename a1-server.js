const express = require('express'); 
const supa = require('@supabase/supabase-js'); 
const app = express(); 

const supaUrl = 'https://ybjodlsigafojqpontro.supabase.co'; 
const supaAnonKey = 'sb_publishable_vvYkOXuslpvDZ8836VnlMQ_XxFGYBAt';
 
const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get('/api/eras', async (req, res) => { 
	const {data, error} = await supabase 
		.from('eras') 
		.select(`*`); 
	res.send(data); 
});

app.get('/api/galleries', async (req, res) => { 
	const {data, error} = await supabase 
		.from('eras') 
		.select(`*`); 
	res.send(data); 
});

app.get('/api/galleries/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('galleries') 
		.select(`*`) 
		.eq('galleryId', req.params.ref);
	res.send(data); 
});

app.get('/api/galleries/country/:substring', async (req, res) => { 
	const {data, error} = await supabase 
		.from('galleries') 
		.select(`*`)
		.ilike('galleryCountry', `${req.params.substring}%`);
	res.send(data); 
});

app.get('/api/artists', async (req, res) => { 
	const {data, error} = await supabase 
		.from('artists') 
		.select(`*`); 
	res.send(data); 
});

app.get('/api/artists/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('artists') 
		.select(`*`)
		.eq('artistId', req.params.ref); 
	res.send(data); 
});

app.get('/api/artists/search/:substring', async (req, res) => { 
	const {data, error} = await supabase 
		.from('artists') 
		.select(`*`) 
		.ilike('lastName', `${req.params.substring}%`);
	res.send(data); 
});

app.get('/api/artists/country/:substring', async (req, res) => { 
	const {data, error} = await supabase 
		.from('artists') 
		.select(`*`)
		.ilike('nationality', `${req.params.substring}%`);
	res.send(data); 
});

app.get('/api/genres', async (req, res) => { 
	const {data, error} = await supabase 
		.from('genres') 
		.select(`*, eras(*)`); 
	res.send(data); 
});

app.get('/api/genres/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('genres') 
		.select(`*, eras(*)`)
		.eq('genreID', req.params.ref); 
	res.send(data); 
});

app.get('/api/genres/painting/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintinggenres') 
		.select(`genres(*, eras(*))`)
		.eq('paintingId', req.params.ref)
		.order('genres(genreName)', { ascending: false });
	res.send(data); 
});

app.get('/api/paintings/single/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintings') 
		.select(`*`) 
		.eq('paintingID', req.params.ref);
	res.send(data); 
});

app.get('/api/paintings/sort/:value/limit/:ref', async (req, res) => { 

	let sortBy = "title";
	let max = 1000;
	if (req.params.value === "year") { sortBy = "yearOfWork"; }
	if (req.params.ref > 0) { max = req.params.ref; }

	const {data, error} = await supabase 
		.from('paintings') 
		.select(`*, artists(*), galleries(*)`)
		.limit(`${max}`)
		.order(`${sortBy}`, { ascending: true });
	res.send(data); 
});

app.get('/api/paintings/sort/:value/limit/:ref/skip/:ref2', async (req, res) => { 

	let sortBy = "title";
	const skip = parseInt(req.params.ref2);
	const end = parseInt(req.params.ref) + skip;

	if (req.params.value === "year") { sortBy = "yearOfWork"; }
	if (skip >= 331) {
		res.send({ message : `Skip number results in no paintings` });
	} else {
		const {data, error} = await supabase 
			.from('paintings') 
			.select(`*, artists(*), galleries(*)`)
			.range(skip, end)
			.order(`${sortBy}`, { ascending: true });
		res.send(data); 
	}
});

app.get('/api/paintings/search/:substring', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintings') 
		.select(`*, artists(*), galleries(*)`) 
		.ilike('title', `%${req.params.substring}%`)
		.order('yearOfWork', { ascending: true });
	res.send(data); 
});

app.get('/api/paintings/years/:start/:end', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintings') 
		.select(`*, artists(*), galleries(*)`) 
		.gte('yearOfWork', req.params.start)
  		.lte('yearOfWork', req.params.end)
		.order('yearOfWork', { ascending: true });
	res.send(data); 
});

app.get('/api/paintings/galleries/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintings') 
		.select(`*, artists(*), galleries(*)`)
		.eq('galleryID', req.params.ref) 
		.order('yearOfWork', { ascending: true });
	res.send(data); 
});

app.get('/api/paintings/artist/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintings') 
		.select(`*, artists(*), galleries(*)`)
		.eq('artistID', req.params.ref) 
		.order('yearOfWork', { ascending: true });
	res.send(data); 
});

app.get('/api/paintings/genre/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintinggenres') 
		.select(`paintingId, paintings(title, yearOfWork, artists(*), galleries(*))`)
		.eq('genreId', req.params.ref) 
		.order(`paintings(yearOfWork)`, { ascending: true });
	res.send(data); 
});




// problem with this
app.get('/api/paintings/era/:ref', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintinggenres') 
		.select(`paintingId, paintings(title, yearOfWork, artists(*), galleries(*)), genres(eraID)`)
		.eq('genres.eraID', parseInt(req.params.ref)) 
		.order(`paintings(yearOfWork)`, { ascending: true });
	res.send(data); 
});









app.get('/api/counts/genres', async (req, res) => { 
	const {data, error} = await supabase 
		.from('paintinggenres') 
		.select(`genres(genreName)`) 
		// .order(`paintinggenres(count)`, { ascending: true });
	console.log(error);
	res.send(data); 
});

app.listen(8080, () => { 
	console.log('listening on port 8080'); 
});