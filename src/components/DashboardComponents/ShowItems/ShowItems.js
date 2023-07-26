import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../AlertComponent/AlertComponent";
import { useDispatch } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/fileFolderActionCreator"

const ShowItems = ({ title, items, type }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDoubleClick = (itemId) => {
    if (type === "folder") {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };

  return (
    <div className="w-100">
      <p className="text-center border-bottom pb-2">{title}</p>
      <div className="row gap-2 p-4 flex-wrap">
        {items.map((item, index) => {
          return (
            <>
              {type === "folder" ? (
                <p
                  key={index * 55}
                  className="col-md-2 shadow text-center cursor-pointer rounded d-flex align-items-center justify-content-center py-3 fs-4 text-white mx-1"
                  onDoubleClick={() => handleDoubleClick(item.docId)}
                  style={{ backgroundColor: "rgba(90, 102, 124, .7)",}}
                >
                  <i className="ti ti-folder me-2 fs-8"></i>
                  {item.data.name}
                </p>
              ) : (
                <p
                  key={index * 55}
                  className="col-md-2 border border-1 shadow-sm rounded text-center d-flex flex-column py-3 cursor-pointer mx-1"
                  onDoubleClick={() => handleDoubleClick(item.docId)}
                >
                  <i className="ti ti-file mb-2" style={{ fontSize: "3rem" }}></i>
                  {item.data.name}
                </p>
              )}
              </>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
