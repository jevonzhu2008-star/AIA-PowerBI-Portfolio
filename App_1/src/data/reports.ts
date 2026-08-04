//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

/**
 * 报表元数据定义
 *
 * 结构：Section → MainTab → SubTab
 * - Cloud Finance & FinOps: 4 个主标签 × (Profile + Report) 两个子标签
 * - Others: 2 个主标签，每个下面多个 carousel 报表
 */

export interface PowerBiReport {
  id: string;
  label: string;
  url: string;
}

export interface ProfileReportSection {
  type: "profile-report";
  profile: PowerBiReport;
  report: PowerBiReport;
}

export interface CarouselSection {
  type: "carousel";
  items: PowerBiReport[];
}

export type SubTabs = ProfileReportSection | CarouselSection;

export interface MainTab {
  id: string;
  label: string;
  hint?: string;
  subTabs: SubTabs;
}

export interface Section {
  id: string;
  label: string;
  hint?: string;
  mainTabs: MainTab[];
}

// ── Cloud Finance & FinOps ──

const cloudFinanceSections: MainTab[] = [
  {
    id: "consumption",
    label: "Consumption",
    hint: "消费分析",
    subTabs: {
      type: "profile-report",
      profile: {
        id: "consumption-profile",
        label: "Consumption Profile",
        url: "https://app.powerbi.com/view?r=eyJrIjoiZDZmMzM0MDYtYjU0Ny00ZGIwLWIzMDEtZTFhNWEyOGZmZjgzIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=f48ca4704a02d62b1053&language=en-US",
      },
      report: {
        id: "consumption-report",
        label: "Consumption Report",
        url: "https://app.powerbi.com/view?r=eyJrIjoiNjM4MmFlODAtNzg2OS00OWEwLTkzYzUtYzdkMmZkNzVjMmNmIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
      },
    },
  },
  {
    id: "efficiency",
    label: "Cloud Efficiency Saving",
    hint: "云效率",
    subTabs: {
      type: "profile-report",
      profile: {
        id: "efficiency-profile",
        label: "Cloud Efficiency Saving Profile",
        url: "https://app.powerbi.com/view?r=eyJrIjoiNjhhNWRlZWYtMzA4OC00Mzc3LTkyZWMtOWU3MmYzYTI3NjZiIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=f48ca4704a02d62b1053&language=en-US",
      },
      report: {
        id: "efficiency-report",
        label: "Cloud Efficiency Saving Report",
        url: "https://app.powerbi.com/view?r=eyJrIjoiMjEzZjVmYTUtMTdiYS00MmQ4LWIwMWYtODI1NmFjMzg4OGIzIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
      },
    },
  },
  {
    id: "kyndryl",
    label: "Cloud & Kyndryl Spend",
    hint: "支出分析",
    subTabs: {
      type: "profile-report",
      profile: {
        id: "kyndryl-profile",
        label: "Cloud and Kyndryl Spend Profile",
        url: "https://app.powerbi.com/view?r=eyJrIjoiZGIxMTZlNjQtMzZhNy00MDU1LWE2NmYtNTZiYzJhZmVlZDYwIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=f48ca4704a02d62b1053&language=en-US",
      },
      report: {
        id: "kyndryl-report",
        label: "Cloud and Kyndryl Spend Report",
        url: "https://app.powerbi.com/view?r=eyJrIjoiYzZmNTc4MWYtMDk1Ny00MjY5LTlmN2QtMGJhMTQzNWI0ZGEwIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
      },
    },
  },
  {
    id: "cost",
    label: "Cloud Cost Management",
    hint: "成本管理",
    subTabs: {
      type: "profile-report",
      profile: {
        id: "cost-profile",
        label: "Cost Management Profile",
        url: "https://app.powerbi.com/view?r=eyJrIjoiMmE3M2VjNDAtOTEyYi00NmVmLThhZjctMTMzMWExOGZiM2NhIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=f48ca4704a02d62b1053&language=en-US",
      },
      report: {
        id: "cost-report",
        label: "Cloud Cost Management Report",
        url: "https://app.powerbi.com/view?r=eyJrIjoiOTEwMWEwZjItMDMwYi00YjI3LTk3NmQtYmZhMWQ0ZTNiM2RmIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=73fe0a6a28ff6e4829a0&language=en-US",
      },
    },
  },
];

// ── Others ──

const othersSections: MainTab[] = [
  {
    id: "it-operations",
    label: "IT Operations Monitoring",
    hint: "运维监控",
    subTabs: {
      type: "carousel",
      items: [
        {
          id: "group-apps",
          label: "Group Applications Monitoring Dashboard",
          url: "https://app.powerbi.com/view?r=eyJrIjoiMDcyZjMzMjItZTU5NS00M2M4LWFkMWYtOTJmNjY1NzMxMmQwIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=ReportSection48e0148969a7a9e57dbf&language=en-US",
        },
        {
          id: "platforms",
          label: "Platforms Monitoring",
          url: "https://app.powerbi.com/view?r=eyJrIjoiY2MwMGJmNGMtYjVmZS00ODA4LWI5MDUtYTgxZGZjZmVkMjBhIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=ReportSection4d5f04025cbd90d529c9&language=en-US",
        },
        {
          id: "stability",
          label: "System Stability",
          url: "https://app.powerbi.com/view?r=eyJrIjoiZDMyMmYxYTktMDI1Ny00ODg4LWFiMTMtYjk3Yjk1YTM3YzY0IiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
        },
        {
          id: "service-mgmt",
          label: "Service Management - CLARITY_SMT",
          url: "https://app.powerbi.com/view?r=eyJrIjoiMzUzMTgzMzctOGEzMy00ZTNjLWE5NTMtMTA5MzAxYWNlNDQyIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=ReportSection1e2615bedc24029c8ac5&language=en-US",
        },
        {
          id: "ccoe",
          label: "Cloud Services CCoE",
          url: "https://app.powerbi.com/view?r=eyJrIjoiZTdhODk3YWUtODhiYS00Y2VlLWI0NDktYWVlYmU2ODUzMzZlIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&pageName=ReportSectionfb609da3900c20b08b08&language=en-US",
        },
      ],
    },
  },
  {
    id: "operational-analytics",
    label: "Operational Analytics",
    hint: "运营分析",
    subTabs: {
      type: "carousel",
      items: [
        {
          id: "access-control",
          label: "Access Control Admin",
          url: "https://app.powerbi.com/view?r=eyJrIjoiYWM1YTk0MjEtMmQ5Mi00NjZiLWEwZjctM2M3M2QzZTYxYTdjIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
        },
        {
          id: "actimize",
          label: "Actimize Alert Dashboard",
          url: "https://app.powerbi.com/view?r=eyJrIjoiN2RjZGYwNzMtYzMxMy00MTU5LTgxZTItMTI2MDU4YmMxMzQ5IiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
        },
        {
          id: "tech-academy",
          label: "AIA Tech Academy Dashboard",
          url: "https://app.powerbi.com/view?r=eyJrIjoiZGE3OGY3NzgtMjhkYi00MDg1LWFmNDAtMDRjNGVmMDE2OTdmIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
        },
        {
          id: "banca",
          label: "Banca",
          url: "https://app.powerbi.com/view?r=eyJrIjoiNGRmMjNmZWQtMmE0Mi00NmZmLWE3NjgtMTQ1ZmZlM2ZhMzkzIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
        },
        {
          id: "policy",
          label: "Policy Summary",
          url: "https://app.powerbi.com/view?r=eyJrIjoiMjZiMmNkNGMtNWYxOC00YjgxLWI4N2EtYzJmOWRhMDRiMDMxIiwidCI6ImIyZGE5Y2IyLTU5YmEtNGQzMy1iMDc1LTFjYjc0NWRkZGUxYyIsImMiOjEwfQ%3D%3D&language=en-US",
        },
      ],
    },
  },
];

// ── 公开导出 ──

export const SECTIONS: Section[] = [
  {
    id: "cloud-finance",
    label: "Cloud Finance & FinOps",
    hint: "云财务运营中心",
    mainTabs: cloudFinanceSections,
  },
  {
    id: "others",
    label: "Others",
    hint: "综合运维与运营分析",
    mainTabs: othersSections,
  },
];
