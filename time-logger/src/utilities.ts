export const workUnitsForLineChart = (workUnits: any) => { // NOTE: proper type needed
    // NOTE: this should be more readable, I'm sure there's a more efficient way of doing this too so have a look into that
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
        const dataFormattedAndSorted = dataFormatted.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());
        return {
            id: k,
            data: dataFormattedAndSorted
        }
    })
    // the Nivo library has a strange quirk where the first array item must be the one containing the first peice of data to be plotted on the y axis
    const nivoFormatQuirkCorrected = nivoFormat.sort((a, b) => new Date(a.data[0].x).getTime() - new Date(b.data[0].x).getTime());
    return nivoFormatQuirkCorrected;
}
