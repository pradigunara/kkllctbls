import _ from "lodash";
import imageCompression from 'browser-image-compression';
import { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Upload, Button, Switch } from 'antd'
import db from 'data/db.json'

const submitInput = (data) =>
  fetch('http://localhost:3000/api/input', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch(console.error)

export default function InputPage() {
  const [form] = Form.useForm()
  const [selectedEra, setSelectedEra] = useState()

  const handleFinish = (payload) => {
    submitInput(payload).then(() => alert('OK'))
  }

  const createOptions = (opts = []) => opts.map((o) => ({ label: o.name, value: o.code }))

  return (
    <Row justify="center" style={{ marginTop: '5vh' }}>
      <Col span={12}>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item label="Member" name="memberCode">
            <Select
              options={createOptions(db.members)}
              placeholder="Select Member"
              showSearch
            />
          </Form.Item>
          <Form.Item label="Era" name="eraCode">
            <Select
              options={createOptions(db.eras)}
              placeholder="Select Era"
              showSearch
              onSelect={setSelectedEra}
            />
          </Form.Item>
          <Form.Item label="Section" name="sectionCode">
            <Select
              options={createOptions(db.sections?.[selectedEra])}
              placeholder="Select Section"
              showSearch
            />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Rounded" name="rounded" valuePropName="checked" initialValue={true}>
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <ImageUploader />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

const FILETYPE_EXT = {
  'image/jpeg': '.jpg'
};
const ALLOWED_FILE_TYPES = _.keys(FILETYPE_EXT);

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

function ImageUploader({ value, onChange, filenamePrefix = '' }) {
  const [internalFileList, setInternalFileList] = useState(value ?? []);
  const [b64src, setB64src] = useState();

  const handleChange = async ({ fileList }) => {
    const listCopy = [...fileList];
    const lastFile = _.last(listCopy);

    if (!_.includes(ALLOWED_FILE_TYPES, lastFile?.type)) {
      return alert(
        `File type not allowed (must be jpg)`
      );
    }

    const timestamp = Date.now();
    const extension = _.get(FILETYPE_EXT, lastFile.type);
    const name = `${filenamePrefix}-${timestamp}${extension}`;

    // modify the original file for compression
    const compressedBlob = await imageCompression(lastFile?.originFileObj ?? lastFile, {
      maxSizeMB: 4,
      maxWidthOrHeight: 500
    });
    const File = window?.File ? window.File : _.identity();
    const compressedFile = new File([compressedBlob], name, {
      lastModified: timestamp,
      type: compressedBlob.type
    });

    const base64DataUrl = await toBase64(compressedFile);
    const base64 = _.last(base64DataUrl?.split('base64,'));

    const modifiedLastUpload = [{ ...lastFile, originFileObj: compressedFile, base64 }];

    setInternalFileList(modifiedLastUpload);
    setB64src(base64DataUrl);
    onChange(_.last(modifiedLastUpload)?.base64);

    return true;
  }

  const handleDrop = ({ dataTransfer }) => handleChange({ fileList: dataTransfer.files })

  return (
    <>
      <Upload.Dragger
        accept="image/jpg"
        listType="picture"
        defaultFileList={internalFileList}
        beforeUpload={() => false}
        onChange={handleChange}
        onDrop={handleDrop}
        maxCount={1}
        openFileDialogOnClick={false}
      >
        Drag to Upload Here
      </Upload.Dragger>
      <img src={b64src} style={{ maxHeight: '20vh' }}/>
    </>
  );
}
