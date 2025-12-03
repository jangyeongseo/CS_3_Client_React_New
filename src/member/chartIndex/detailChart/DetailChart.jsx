import React, { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import { UseDetailChart } from "./UseDetailChart";
import useAuthStore from "../../../store/useStore";

const DetailChart = ({ menuList, activeMenu, currentWeek, actualData, standardData, isFetalMode }) => {


  const [option, setOption] = useState({});
  const babySeq = useAuthStore(state => state.babySeq);
  const babyDueDate = useAuthStore(state => state.babyDueDate);

  console.log("DetailChart Props:", {
    menuList,
    activeMenu,
    currentWeek,
    standardData,
    actualData,
    babySeq,
    babyDueDate,
    isFetalMode
  });
  useEffect(() => {
    if (!babySeq || !babyDueDate) {
      console.warn("DetailChart: babySeq 또는 dueDate 없음");
      setOption({});
      return;
    }

    UseDetailChart(activeMenu, currentWeek, menuList, standardData, babySeq, babyDueDate, isFetalMode)
      .then(chartOption => setOption(chartOption));
    console.log("UseDetailChart 반환 옵션:", option);

  }, [activeMenu, currentWeek, menuList, standardData, babySeq, babyDueDate, isFetalMode]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {option ? (
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      ) : (
        <p>아기 정보가 로드될 때까지 대기중...</p>
      )}
    </div>
  );
};

export default DetailChart;
