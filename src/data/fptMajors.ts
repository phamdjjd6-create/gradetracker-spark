// FPT University Major Data

export interface MajorInfo {
  name: string;
  code: string;
  semesters: { [key: number]: string[] };
}

export interface BlockInfo {
  name: string;
  majors: { [key: string]: MajorInfo };
}

export const fptMajorData: { [key: string]: BlockInfo } = {
  NgoaiNgu: {
    name: "Khối ngành Ngoại ngữ",
    majors: {
      BEN: {
        name: "Ngôn ngữ Anh",
        code: "BEN",
        semesters: {
          1: ["EAW212", "ECR202", "ENG303", "ENP102", "SSL101c"],
          2: ["EAL202c", "EAW222", "ECB101", "LTG202", "SSG104"],
          3: ["CHN113", "ERW412", "LIT301", "SEM101", "SSC302c"],
          4: ["CHN123", "ECC302c", "EPC301", "ERW422", "ESL101"],
          5: ["EBC301c", "ELI302", "ELT302", "ENB302", "VNC104"],
          6: ["EPE301c", "OJE202"],
          7: ["BEN_COM*1", "BEN_COM*2", "ELI402", "ELT402", "EXE101"],
          8: ["BEN_COM*3", "BEN_COM*4", "ELR301", "EXE201", "MLN111", "MLN122"],
          9: ["BEN_GRA_ELE", "HCM202", "MLN131", "VNR202"],
        },
      },
      BJP_EN: {
        name: "Ngôn ngữ Nhật",
        code: "BJP_EN",
        semesters: {
          1: ["JPD116", "JPD126", "SSL101c"],
          2: ["ENP102", "JPD216", "JPD226"],
          3: ["ECR301", "ENG303", "JPD316", "JPD326"],
          4: ["EAW301", "JPD336", "JPD346"],
          5: ["JIP301", "JSC301m", "JST301", "SSC302m", "SSG105"],
          6: ["ENW492c", "OJP202"],
          7: ["EXE101", "JEN_COM*1", "JEN_COM*2", "JJB391", "JLR302"],
          8: ["EXE201", "JEN_COM*3", "JEN_COM*4", "MLN111", "MLN122"],
          9: ["BJP_GRA_ELE", "HCM202", "MLN131", "VNR202"],
        },
      },
      BKR_EN: {
        name: "Ngôn ngữ Hàn",
        code: "BKR_EN",
        semesters: {
          1: ["ENP102", "KRL112", "MLN111", "MLN122", "SSL101c"],
          2: ["KRL122", "KRL212", "MLN131"],
          3: ["ENG303", "KRL222", "KRL312"],
          4: ["ECR301", "KRL322", "KST401", "SSG105"],
          5: ["EAW301", "KIL301", "KLP401", "KOS301", "KRL402"],
          6: ["ENW492c", "OJK202"],
          7: ["BKR_EN_COM*1", "EXE101", "KRL502", "SSC302m"],
          8: ["BKR_EN_COM*2", "BKR_EN_COM*3", "BKR_EN_COM*4", "EXE201", "KAW402"],
          9: ["BKR_GRA_ELE", "HCM202", "VNR202"],
        },
      },
      BCH_EN: {
        name: "Ngôn ngữ Trung Quốc",
        code: "BCH_EN",
        semesters: {
          1: ["CHI111", "CHI121", "CHS111", "SSL101c"],
          2: ["CHI311", "CHS121", "ENP102"],
          3: ["CHI321", "CHI331", "CHS201", "ECR301", "ENG303"],
          4: ["CHI401", "CHS301", "CPL401", "EAW301"],
          5: ["CCS401", "CHG401", "CHS401", "CTI401", "SSG105"],
          6: ["ENW492c", "OJC202"],
          7: ["CEN_COM*1", "CEN_COM*2", "CRM401", "EXE101", "SSC302m"],
          8: ["CEN_COM*3", "CEN_COM*4", "EXE201", "MLN111", "MLN122"],
          9: ["BCH_GRA_ELE", "HCM202", "MLN131", "VNR202"],
        },
      },
    },
  },
  KinhTe: {
    name: "Khối ngành Kinh tế",
    majors: {
      Marketing: {
        name: "Marketing",
        code: "Marketing",
        semesters: {
          1: ["ECO111", "ENM301", "MGT103", "MKT101", "SSL101c"],
          2: ["ACC101", "ECO121", "ENM401", "OBE102c", "SSG104"],
          3: ["FIN202", "MKT304", "MKT201", "HRM202c", "DMS301m"],
          4: ["CHN113", "DMA301m", "ITA203c", "MAS202", "MKT202"],
          5: ["CHN123", "DTG111", "MKT208c", "SAL301", "SSB201"],
          6: ["ENW492c", "OJB202"],
          7: ["EXE101", "LAW102", "MKT_COM*1", "MKT_COM*2", "MKT_COM*3"],
          8: ["EXE201", "MKT_COM*4", "MKT301", "MLN111", "MLN122", "PMG201c"],
          9: ["HCM202", "MKT_GRA_ELE", "MLN131", "VNR202"],
        },
      },
      QTKD: {
        name: "Quản trị kinh doanh",
        code: "QTKD",
        semesters: {
          1: ["ACC101", "ECO111", "ENM302", "MGT103", "SSA101"],
          2: ["ECO121", "ENM402", "FIN202", "MKT101", "OBE102c"],
          3: ["DMS301m", "DTG111", "MAS202", "MKT201", "MKT208c"],
          4: ["BDT202c", "CHN113", "MKT202", "MKT304", "SSG105"],
          5: ["CHN123", "DMA301m", "EEC101", "HRM202c", "SAL301"],
          6: ["ENW492c", "OJB202"],
          7: ["EXE101", "LAW102", "MKT_COM*1", "MKT_COM*2", "MKT_COM*3"],
          8: ["EXE201", "MKT_COM*4", "MKT301", "MLN111", "MLN122", "PMG201c"],
          9: ["HCM202", "MKT_GRA_ELE", "MLN131", "VNR202"],
        },
      },
      Logistics: {
        name: "Quản lý logistics và chuỗi cung ứng toàn cầu",
        code: "Logistics",
        semesters: {
          1: ["ECO102", "ENM302", "MGT103", "MKT101", "SSL101c"],
          2: ["ACC101", "ENM402", "OBE102c", "SCM202", "SSG104"],
          3: ["FIN202", "GLI201", "GLT301", "HRM202c", "SCM302"],
          4: ["BDT202c", "CHN113", "GLA301", "GSF301", "MAS202"],
          5: ["MAS202", "GLC301", "GLH301", "SAP312", "SSB201"],
          6: ["ENW492c", "OJB202"],
          7: ["EXE101", "GL_COM*1", "GL_COM*2", "GL_COM*3", "LAW102"],
          8: ["EXE201", "GL_COM*4", "MLN111", "MLN122", "PMG201c", "RMB302"],
          9: ["GL_GRA_ELE", "HCM202", "MLN131", "VNR202"],
        },
      },
      TaiChinh: {
        name: "Tài chính",
        code: "TaiChinh",
        semesters: {
          1: ["ACC101", "ECO111", "ENM301", "MGT103", "SSL101c"],
          2: ["ECO121", "ENM401", "FIN202", "OBE102c", "SSG104"],
          3: ["ACC302", "FIN201", "FIN303", "HRM202c", "MKT101"],
          4: ["ACC305", "CHN113", "FIN301", "ITA203c", "MAS202"],
          5: ["CHN123", "FIM302c", "FIN402", "RMB302", "SSB201"],
          6: ["ENW492c", "OJB202"],
          7: ["EXE101", "FIN_COM*1", "FIN_COM*2", "FIN_COM*3", "LAW102"],
          8: ["BKG303", "EXE201", "FIN_COM*4", "MLN111", "MLN122", "PMG201c"],
          9: ["FIN_GRA_ELE", "HCM202", "MLN131", "VNR202"],
        },
      },
    },
  },
  CNTT: {
    name: "Khối ngành Công nghệ thông tin",
    majors: {
      SE: {
        name: "Kĩ thuật phần mềm",
        code: "SE",
        semesters: {
          1: ["CEA201", "CSI106", "MAE101", "PRF192", "SSA101"],
          2: ["MAD101", "NWC204", "OSG202", "PRO192", "WED201c"],
          3: ["DBI202", "JPD113", "LAB211", "MAS291", "SWE202c"],
          4: ["CSD201", "IOT102", "JPD123", "PRJ301", "SWR302"],
          5: ["SE_COM*1", "SSG105", "SWP391", "SWT301", "WDU203c"],
          6: ["ENW493c", "OJT202"],
          7: ["EXE101", "PMG201c", "SE_COM*2", "SE_COM*3", "SWD392"],
          8: ["EXE201", "ITE302c", "MLN111", "MLN122", "PRM393", "SE_COM*4_ELE"],
          9: ["HCM202", "MLN131", "SE_GRA_ELE", "VNR202"],
        },
      },
      AI: {
        name: "Trí tuệ nhân tạo",
        code: "AI",
        semesters: {
          1: ["CSI106", "MAD101", "MAE101", "PFP191", "SSL101c"],
          2: ["AIG202c", "CEA201", "CSD203", "DBI202", "JPD113"],
          3: ["ADY201m", "ITE303c", "JPD123", "MAI391", "MAS291"],
          4: ["AIL303m", "CPV301", "DAP391m", "SSG105", "SWE201c"],
          5: ["AI17_COM*1", "AI17_COM*2", "DPL302m", "DWP301c"],
          6: ["NLP301c", "OJT202"],
          7: ["AI17_COM*3", "DAT301m", "ENW493c", "EXE101", "PMG201c"],
          8: ["AI17_COM*4", "AID301c", "EXE201", "MLN111", "MLN122", "REL301m"],
          9: ["AI17_GRA_ELE", "HCM202", "MLN131", "VNR202"],
        },
      },
      IA: {
        name: "An Toàn Thông Tin",
        code: "IA",
        semesters: {
          1: ["CEA201", "CSI106", "MAE101", "PFP191", "SSL101c"],
          2: ["APO201c", "IOT102", "MAD101", "NWC204", "OSG20x"],
          3: ["CSD203", "DBI202", "IA_ELE2", "JPD113", "NWC303"],
          4: ["AIC211", "ITE302c", "JPD123", "MAS291", "SSG105"],
          5: ["CRY303c", "FRS301", "IAA202", "IAM302", "PWD301"],
          6: ["ENW493c", "OJT202"],
          7: ["EXE101", "HOD402", "IA_COM*1", "IA_COM*2", "IAP301"],
          8: ["EXE201", "IA_COM*3", "IA_COM*4", "MLN111", "MLN122", "PMG201c"],
          9: ["HCM202", "IA_GRA_ELE", "MLN131", "VNR202"],
        },
      },
      IS: {
        name: "Hệ thống thông tin",
        code: "IS",
        semesters: {
          1: ["CEA201", "CSI106", "MAE101", "PRF192", "SSL101c"],
          2: ["JPD113", "MAD101", "NWC204", "OSG202", "PRO192"],
          3: ["CSD201", "DBI202", "ITA203c", "JPD123", "LAB211"],
          4: ["MAS291", "PRC392c", "PRJ302", "SSG105", "SWE201c"],
          5: ["IS_COM*1", "ISM302", "ISP392", "ITA301", "ITE302c"],
          6: ["ENW493c", "OJT202"],
          7: ["EXE101", "IS_COM*2", "IS_COM*3", "ISC301", "ITB302c"],
          8: ["DTA301", "EXE201", "IS_COM*4", "MLN111", "MLN122", "PMG21c"],
          9: ["HCM202", "IS_GRA_ELE", "MLN131", "VNR202"],
        },
      },
    },
  },
};

export const getBlockOptions = () => {
  return Object.entries(fptMajorData).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));
};

export const getMajorOptions = (block: string | null) => {
  if (!block || !fptMajorData[block]) return [];
  return Object.entries(fptMajorData[block].majors).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));
};

export const getSemesterCourses = (block: string | null, subMajor: string | null, semester: number) => {
  if (!block || !subMajor || !fptMajorData[block]?.majors[subMajor]) return [];
  return fptMajorData[block].majors[subMajor].semesters[semester] || [];
};

export const getTotalSemesters = (block: string | null, subMajor: string | null) => {
  if (!block || !subMajor || !fptMajorData[block]?.majors[subMajor]) return 9;
  return Object.keys(fptMajorData[block].majors[subMajor].semesters).length;
};
