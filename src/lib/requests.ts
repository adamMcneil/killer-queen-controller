export async function control(ip: string, player: string, movement: string) {
	const request = await fetch( ip + "/api/v1/control", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			player: player,
			movement: movement 
		})
	});
	return request;
}
