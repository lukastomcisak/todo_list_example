import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	const passwordHash = await bcrypt.hash(password, salt)
	return passwordHash
}

export const verifyPassword = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash)
}