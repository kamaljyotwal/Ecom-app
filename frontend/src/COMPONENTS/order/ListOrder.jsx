import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import CustomTitle from "../layouts/CustomTitle";
import { myOrdersAction, clearErrors } from "../../actions/orderAction";
import Loader from "../Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";

export default function ListOrder() {
  const alert = useAlert();
  const dispatch = useDispatch();

  // global
  const { loading, orders, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrdersAction());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // eslint-disable-next-line
  }, [dispatch, alert]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num. of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders &&
      orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          numOfItems: order.orderedItems.length,
          amount: `$${order.totalPrice}`,
          status:
            order.orderStatus && String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "green" }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
          actions: (
            <Link to={`/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
          ),
        });
      });

    return data;
  };

  return (
    <>
      {!orders ? (
        <h1 className="my-5">You haven't placed any orders yet.</h1>
      ) : (
        <>
          <CustomTitle title="My Orders" />
          <h1 className="my-5">My Orders</h1>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable data={setOrders()} className="px-3" bordered striped hover />
          )}
        </>
      )}
    </>
  );
}
