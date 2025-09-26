import React from "react";
import { useItemDetails } from "../../hooks/useItemDetail";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AvgItemPriceChart from "../../components/Charts/AvgItemPriceChart";

const columns = [
  { field: "item", headerName: "Item", flex: 1 },
  { field: "unit", headerName: "Unit", flex: 1 },
  { field: "min_price", headerName: "Min Price", flex: 1 },
  { field: "max_price", headerName: "Max Price", flex: 1 },
  { field: "avg_price", headerName: "Avg Price", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
];

const ItemDetail = () => {
  const { item } = useParams();
  const { data: itemDetail, isLoading, error } = useItemDetails(item);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!itemDetail || itemDetail.length === 0) return <p>No details found.</p>;

  const [firstItem, ...restItems] = itemDetail;
  const rows = restItems.map((p) => ({
    id: p.id,
    item: p.item,
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
          <h3 className="text-2xl font-bold mb-1">{firstItem.item}</h3>
          <p className="text-gray-600 text-md mb-0.5">
            <span className="font-semibold">Unit:</span> {firstItem.unit || "-"}
          </p>
          <div className="flex gap-4">
            <p className="text-gray-600 text-md mb-0.5">
              <span className="font-semibold">Min:</span>{" "}
              {firstItem.min_price || "-"}
            </p>
            <p className="text-gray-600 text-md mb-0.5">
              <span className="font-semibold">Max:</span>{" "}
              {firstItem.max_price || "-"}
            </p>
            <p className="text-gray-600 text-md">
              <span className="font-semibold">Avg:</span>{" "}
              {firstItem.avg_price || "-"}
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
          Historical Average Prices Over One Month
        </h2>
        <p className="text-gray-600 mt-1">
          {" "}
          See the price trends for{" "}
          <span className="font-bold underline">{firstItem.item}</span> over
          time
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
