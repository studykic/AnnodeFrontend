// latestValueRef는 항상 즉시 변경되는 상태값을 가리킨다.
function useTime() {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const formattedDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const displayDateTime = `${formattedDate.replace(/. /g, ", ")}`;

    return displayDateTime;
  };

  return { formatDateTime };
}

export default useTime;
