import { ProjectType, WorkUnitType } from "./features/userData/userDataSlice";
import { v4 as uuidv4 } from "uuid";

export interface LineChartDataType {
    data: Array<LineChartDataDataType>;
    keys: Array<LineChartDataKey>;
}

export interface RadarChartDataType {
    data: Array<RadarChartDataDataType>;
}

export interface LineChartDataDataType {
    name: string;
    [key: string]: number | string;
}

export interface RadarChartDataDataType {
    subject: string;
    A: number;
}

export interface LineChartDataKey {
    id: string;
    name: string;
    colour?: string;
}

export const workUnitsForRadarChart = (workUnits: WorkUnitType[], projects: ProjectType[]): RadarChartDataType => {

    // check the data is populated
    if (!workUnits || !projects || !workUnits.length || !projects.length) return {data: []};

    var hoursByProjectCount: any = {};
    workUnits.map((day => {
        hoursByProjectCount[day.projectId] = hoursByProjectCount[day.projectId] === undefined ? 1 : hoursByProjectCount[day.projectId] + 1;
    }));

    const radarContent = Object.keys(hoursByProjectCount).map(key => (
        {
            subject: getProjectById(projects, key).name,
            A: hoursByProjectCount[key]}
    ));

    // create blank return object
    var returnObject: RadarChartDataType = {
        data: radarContent
    }

    return returnObject;
}

export const workUnitsForLineChart = (workUnits: WorkUnitType[], projects: ProjectType[]): LineChartDataType => {

// check the data is populated
if (!workUnits || !projects || !workUnits.length || !projects.length) return {data: [], keys: []};

    const workUnitsDateSorted:WorkUnitType[] = sortArrayByDateProperty(workUnits);

    // create blank return object
    var returnObject: LineChartDataType = {
        data: [],
        keys: []
    }

    // fill in the keys for displaying human-readable names
    projects.map((proj) => {
        returnObject.keys.push({
            id: proj.id,
            name: proj.name,
            colour: proj.colour
        });
    })

    makeDatesArray(workUnitsDateSorted[0].date, workUnitsDateSorted[workUnitsDateSorted.length - 1].date, (theDate) => {
        returnObject.data.push({
            name: theDate.slice(0, 10) // NOTE: can this use shortDateFormat(theDate) ? I don't have time to try and test it now
        })
    });

    workUnitsDateSorted.map((unit) => {
        const targetIndex = returnObject.data.findIndex(d => d.name === unit.date);
        if (targetIndex === -1) {
            console.log("Error: no date found within the dates array for possibly badly formatted work unit", unit);
            return;
        }
        const targetObject: any = returnObject.data[targetIndex];
        if (targetObject.hasOwnProperty(unit.projectId)) {
            targetObject[unit.projectId] ++;
        } else {
            targetObject[unit.projectId] = 1;
        }
    })

    return returnObject;
}

export const makeDatesArray = (start: string, end: string, callback: (arg: string) => void) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setHours(12); // set time to 12pm to avoid any issues with daylight saving hours
    endDate.setHours(12);
    for(var arr=[]; startDate<=endDate; startDate.setDate(startDate.getDate()+1)){
        const returnDate = new Date(startDate).toISOString();
        if (callback) {
            callback(returnDate);
        }
        arr.push(returnDate);
    }
    return arr;
}

export const groupArrayByProperty = (arr: Array<any>, property: string) => {
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
}

export const getProjectById = (projectArray: Array<ProjectType>, id: string): ProjectType => {
    const foundProject = projectArray.find((p) => p.id === id);
    return foundProject ? foundProject : {} as ProjectType;
}

export const shortDateFormat = (dateObject?: Date | null):string => {
    if(dateObject) {
        return new Date(dateObject).toISOString().slice(0, 10);
    } else {
        return new Date().toISOString().slice(0, 10);
    }
}

export const shortDateFormatChecker = (dateString: string) => {
    const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    return regex.test(dateString);
  }

export const getWorkUnitsWithinDateRange = (earlyDate: string, lateDate:string, workUnits: WorkUnitType[]):WorkUnitType[] => {
    if(!shortDateFormatChecker(earlyDate) || !shortDateFormatChecker(lateDate)) return [];
    const range = {lo: new Date(`${earlyDate}:00:00:00`).getTime(), hi: new Date(`${lateDate}:23:59:59`).getTime()}
    return workUnits.filter(u => {
        const uDate = new Date(u.date).getTime();
        return uDate <= range.hi && uDate >= range.lo;
    })
}

export const sortArrayByDateProperty = (array: any[]) => (array.toSorted((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime())); // NOTE: .toSorted needs a polyfil since it's very newly released

export const uidGen = () => (uuidv4()); // it's worth putting this in utilities for now in case the UID format needs to be customised globally in the future
