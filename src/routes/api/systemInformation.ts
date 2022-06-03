import si from 'systeminformation'
import os from 'os'
import disk from 'diskusage'

const getCpuUsage = () => {
	const cpus = os.cpus()

	const oldCPUIdle = 0
	let oldCPUTime = 0
	let totalTime = -oldCPUTime
	let totalIdle = -oldCPUIdle

	for (let i = 0; i < cpus.length; i++) {
		const cpu = cpus[i]
		for (const type in cpu.times) {
			totalTime += cpu.times[type]
			if (type == 'idle') {
				totalIdle += cpu.times[type]
			}
		}
	}

	oldCPUTime = totalTime = totalIdle

	return 100 - Math.round((totalIdle / totalTime) * 100)
}

const getRamUsage = () => 100 - Math.round((os.freemem() / os.totalmem()) * 100)

const getCpuTemperature = () => {
	return si
		.cpuTemperature()
		.then((data) => data.main && Math.round(data.main))
		.catch((error) => console.log('Err', error))
}

const getDiskUsage = () => {
	const path = os.platform() === 'win32' ? 'c:' : '/'

	return disk
		.check(path)
		.then(
			(data) =>
				data.available && data.total && Math.round(100 - (data.available / data.total) * 100)
		)
		.catch((error) => console.log('Err', error))
}

export const get = async () => {
	return {
		body: {
			data: {
				cpuUsage: getCpuUsage(),
				ramUsage: getRamUsage(),
				diskUsage: await getDiskUsage(),
				cpuTemperature: await getCpuTemperature()
			}
		}
	}
}
