import { ProjectType, WorkUnitType } from "./features/userData/userDataSlice";
import { v4 as uuidv4 } from "uuid";

export interface LineChartDataType {
    data: Array<LineChartDataDataType>;
    keys: Array<LineChartDataKey>;
}

export interface RadarChartDataType {
    data: Array<RadarChartDataDataType>;
    keys: Array<RadarChartDataKey>;
}

export interface LineChartDataDataType {
    name: string;
    [key: string]: number | string;
}

export interface RadarChartDataDataType {
    name: string;
    [key: string]: number | string;
}

export interface LineChartDataKey {
    id: string;
    name: string;
    colour?: string;
}

export interface RadarChartDataKey {
    id: string;
    name: string;
    colour?: string;
}

export const workUnitsForRadarChart = (workUnits: WorkUnitType[], projects: ProjectType[]): RadarChartDataType => {

    // check the data is populated
    if (!workUnits || !projects || !workUnits.length || !projects.length) return {data: [], keys: []};

    console.log("workUnits••••••••••••• ", workUnits);

    // create blank return object
    var returnObject: RadarChartDataType = {
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

    makeDatesArray(workUnits[0].date, workUnits[workUnits.length - 1].date, (theDate) => {
        returnObject.data.push({
            name: theDate.slice(0, 10) // NOTE: can this use shortDateFormat(theDate) ? I don't have time to try and test it now
        })
    });

    workUnits.map((unit) => {
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

export const workUnitsForLineChart = (workUnits: WorkUnitType[], projects: ProjectType[]): LineChartDataType => {

    // check the data is populated
    if (!workUnits || !projects || !workUnits.length || !projects.length) return {data: [], keys: []};

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

    makeDatesArray(workUnits[0].date, workUnits[workUnits.length - 1].date, (theDate) => {
        returnObject.data.push({
            name: theDate.slice(0, 10) // NOTE: can this use shortDateFormat(theDate) ? I don't have time to try and test it now
        })
    });

    workUnits.map((unit) => {
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

export const sumWorkUnitHoursByProjectId = (workDays: WorkUnitType[]) => {
    var hoursByProjectCount: any = {};
    workDays.map((day => {
        Object.keys(day).map(key => {
            if(key === "name" || key === "date") return;
            hoursByProjectCount[key] = hoursByProjectCount[key] === undefined ? 0 : hoursByProjectCount[key] + day[key];
        })
    }));
    return hoursByProjectCount;
}

export const getProjectById = (projectArray: Array<ProjectType>, id: string): ProjectType => {
    const foundProject = projectArray.find((p) => p.id === id);
    return foundProject ? foundProject : {} as ProjectType;
}

export const shortDateFormat = (dateAsISOString?: string):string => {
    if(dateAsISOString) {
        return new Date(dateAsISOString).toISOString().slice(0, 10);
    } else {
        return new Date().toISOString().slice(0, 10);
    }
}

export const uidGen = () => (uuidv4()); // it's worth putting this in utilities for now in case the UID format needs to be customised globally in the future
