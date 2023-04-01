export const workUnitsForLineChart = (workUnits: any) => { // NOTE: proper type needed
    // NOTE: this should be more readable, is should also sort by date with LoDash orderBy
    const dayCountByProject:any = {};
    workUnits.map((w:any) => {
        if (!dayCountByProject.hasOwnProperty(w.projectId)) {
            dayCountByProject[w.projectId] = {};
            dayCountByProject[w.projectId][w.date] = 1;
        } else if (dayCountByProject[w.projectId].hasOwnProperty(w.date)) {
            dayCountByProject[w.projectId][w.date]++;
        } else {
            dayCountByProject[w.projectId][w.date] = 1;
        }
    })
    const nivoFormat = Object.keys(dayCountByProject).map((k) => {
        const dataFormatted = Object.keys(dayCountByProject[k]).map((kk) => ({x: kk, y: dayCountByProject[k][kk]}));
        return {
            id: k,
            data: dataFormatted
        }
    })
    return nivoFormat;
}
