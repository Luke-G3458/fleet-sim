export type Node = {
	id: string,
	x: number,
	y: number
}

export type Path = {
	id: string,
	start: string,
	end: string
}

export type AMRType = {
	id: string,
	x: number,
	y: number
}

export type Tool = "pan" | "node"
