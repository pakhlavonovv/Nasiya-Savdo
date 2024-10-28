import { Button, ColorPicker, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { CategoryDataType } from "../types";
import { useCreateCategory, useUpdateCategory } from "../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { ModalPropType } from "../../types";

const ProductModal = ({ open, handleClose, update }: ModalPropType) => {
  const [color, setColor] = useState("#ffffff"); 
  const [form] = useForm();
  const queryClient = useQueryClient();

  const { mutate: createMutate } = useCreateCategory();
  const { mutate: updateMutate } = useUpdateCategory();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({ name: update.name });
      } else {
        form.resetFields();
      }
    }
  }, [update, open, form]);

  const handleSubmit = (values: CategoryDataType) => {
    if (update) {
      const payload = { ...values, id: update.id };
      updateMutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["category"] });
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      });
    } else {
      createMutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["category"] });
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      });
    }
  };

  return (
    <Modal
      title={update ? "Edit Product" : "Add Product"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "Please enter model" }]}
        >
          <Input placeholder="Enter model name" />
        </Form.Item>
        <Form.Item
      label="Color"
      name="color"
      rules={[{ required: true, message: "Please select a color" }]}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Enter color"
          style={{ marginRight: 8 }}
        />
        <ColorPicker
          value={color}
          onChange={setColor}
        />
      </div>
    </Form.Item>

    <Form.Item
          label="Made in"
          name="made_in"
          rules={[{ required: true, message: "Please enter when made in" }]}
        >
          <Input placeholder="Enter when made in" />
        </Form.Item>
        <Form.Item
          label="Image url"
          name="image_url"
          rules={[{ required: true, message: "Please enter image url" }]}
        >
          <Input placeholder="Enter image url" />
        </Form.Item>
        <Form.Item
          label="Date of creation"
          name="date_of_creation"
          rules={[{ required: true, message: "Please enter date of creation" }]}
        >
          <Input placeholder="Enter date" />
        </Form.Item>
        <Form.Item>
          <Button className='bg-[#AD8354] text-white' htmlType="submit" block>
            {update ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
