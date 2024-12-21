import React from 'react';
import { Pencil, Trash2 } from "lucide-react";

const CertificateCard = ({
  imageUrl,
  title,
  description,
  dateIssued,
  handleEdit,
  handleDelete,
  id,
  isEditable,
}) => {

  return (
    <div className="max-w-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(95,60,104,0.3)] bg-backGroundColor border border-secondary/30">
      <div className="relative h-48 overflow-hidden bg-backGroundColor">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-backGroundColor to-transparent" />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-textColor line-clamp-2 tracking-wide">
            {title}
          </h3>
          
          <p className="text-sm text-textspan">
            Issued on: <span className="text-textspan">{dateIssued}</span>
          </p>
          
          <p className="text-sm text-textspan line-clamp-3">
            {description}
          </p>
        </div>
        {isEditable?
        <div className="flex justify-end space-x-2 pt-4">
          <button 
            onClick={() => handleEdit(id)}
            className="flex items-center gap-1 px-4 py-2 text-sm rounded-md bg-secondary/20 border border-accent/30 text-accent hover:bg-accent/20 hover:border-accent transition-all duration-300"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          
          <button 
            onClick={() => handleDelete(id)}
            className="flex items-center gap-1 px-4 py-2 text-sm rounded-md bg-error/20 text-error hover:bg-error hover:text-textColor transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
        :<></>}
      </div>
    </div>
  );
};

export default CertificateCard;