//Worker
{
	//Base Properies
	connections: [],
	email: accountData.email,
	password: hashedPassword,
	photos: [],
	verified: false,
	rating: 0,
	carrier: accountData.carrier,
	sms: accountData.sms,
	about: accountData.about,
	banned: false,
	city: accountData.city,
	state: accountData.state,
	loc: {
		type: "Point",
		coordinates: accountData.loc.coordinates
	},
	//Worker Properties
	first_name: accountData.first_name,
	last_name: accountData.last_name,
	age: accountData.age,
	skills: accountData.skills,
}
//Contractor
{
	connections: [],
	email: accountData.email,
	password: hashedPassword,
	photos: [],
	verified: false,
	rating: 0,
	carrier: accountData.carrier,
	sms: accountData.sms,
	about: accountData.about,
	banned: false,
	city: accountData.city,
	state: accountData.state,
	loc: {
		type: "Point",
		coordinates: accountData.loc.coordinates
	},
	//Contractor
	business_name: accountData.business_name,
	street: accountData.street,
	zip_code: accountData.zip_code,
	ein: accountData.ein,
	services: accountData.services
}
//Job
{
	title: data.title,
	description: data.description,
	trade: data.trade,
	city: data.city,
	state: data.state,
	applicants: [], 
	pictures: [],
	pay_type: data.pay_type,
	amount: data.amount,
	postedBy: data.company_name,
	createdAt: Date.now(),
	loc: {
		type: "Point",
		coordinates: data.coords
	},
	lock: false,
}