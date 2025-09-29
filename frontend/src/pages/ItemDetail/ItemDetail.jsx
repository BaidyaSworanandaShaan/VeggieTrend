import React from "react";
import { useItemDetails } from "../../hooks/useItemDetail";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AvgItemPriceChart from "../../components/Charts/AvgItemPriceChart";
import { useTranslation } from "react-i18next";
import NepaliNumber from "../../components/NepaliNumber";

const ItemDetail = () => {
  const { item } = useParams();
  const { data: itemDetail, isLoading, error } = useItemDetails(item);
  const { t, i18n } = useTranslation();

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!itemDetail || itemDetail.length === 0) return <p>No details found.</p>;
  console.log(itemDetail);
  const [firstItem, ...restItems] = itemDetail;
  const columns = [
    {
      field: "item",
      headerName: t("Labels.item"),
      flex: 1,
    },
    {
      field: "item_ne",
      headerName: t("Labels.item"),
      flex: 1,
    },
    { field: "unit", headerName: t("Labels.unit"), flex: 1 },
    {
      field: "min_price",
      headerName: t("Labels.min"),
      flex: 1,
      renderCell: (params) => <NepaliNumber value={params.value} />,
    },
    {
      field: "max_price",
      headerName: t("Labels.max"),
      flex: 1,
      renderCell: (params) => <NepaliNumber value={params.value} />,
    },
    {
      field: "avg_price",
      headerName: t("Labels.avg"),
      flex: 1,
      renderCell: (params) => <NepaliNumber value={params.value} />,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => <NepaliNumber value={params.value} />,
    },
  ];
  const rows = restItems.map((p) => ({
    id: p.id,
    item: p.item,
    item_ne: p.name_ne,
    unit: p.unit || "-",
    min_price: p.min_price || "-",
    max_price: p.max_price || "-",
    avg_price: p.avg_price || "-",
    date: p.date || "-",
  }));
  return (
    <div className="space-y-8 p-6">
      <div
        className="bg-white shadow-sm border rounded-lg p-4 flex justify-between items-center
                 "
      >
        <div className="flex-1 pr-4">
          <h3 className="text-2xl font-bold mb-1">
            {i18n.language === "ne" ? firstItem.name_ne : firstItem.item}
          </h3>
          <p className="text-gray-600 text-md mb-0.5">
            <span className="font-semibold">{t("Labels.unit")}:</span>{" "}
            {firstItem.unit || "-"}
          </p>
          <div className="flex gap-4">
            <p className="text-gray-600 text-md mb-0.5">
              <span className="font-semibold">{t("Labels.min")}:</span>{" "}
              {<NepaliNumber value={firstItem.min_price} /> || "-"}
            </p>
            <p className="text-gray-600 text-md mb-0.5">
              <span className="font-semibold">{t("Labels.max")}:</span>{" "}
              {<NepaliNumber value={firstItem.max_price} /> || "-"}
            </p>
            <p className="text-gray-600 text-md">
              <span className="font-semibold">{t("Labels.avg")}:</span>{" "}
              {<NepaliNumber value={firstItem.avg_price} /> || "-"}
            </p>
          </div>
        </div>

        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={
              firstItem.image_url ||
              "https://img.freepik.com/premium-vector/park-pictogram_764382-144210.jpg"
            }
            alt={firstItem.item}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
      <div className="title">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("historicalPrices.title")}
        </h2>
        <p className="text-gray-600 mt-1">
          {" "}
          {t("historicalPrices.subtitle").replace(
            "XXX",
            i18n.language === "ne" ? firstItem.name_ne : firstItem.item
          )}
        </p>
      </div>
      <AvgItemPriceChart data={itemDetail} />

      <div
        style={{ height: 400, width: "100%" }}
        className="mt-4 font-inter !font-sans "
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.id}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ItemDetail;
