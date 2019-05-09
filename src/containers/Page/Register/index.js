import React, { useState, useContext } from "react";
import "./style.css";
import { Row, Col, Layout, Form, Input, Select, Radio, Button } from "antd";

const { Header, Footer, Content } = Layout;
const { Option } = Select;

const form_style = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const domain_select = (
  <Select defaultValue="1" style={{ width: "200px" }} showArrow={false}>
    <Option value="1">.smartlifevietnam.com</Option>
  </Select>
);

const divide_form_layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

const Register = props => {


  const onSubmit = () => {
    props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        console.log(values);
      }
    });
  };

  const comparePassword = (rule, value, callback) => {
    let { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Mật khẩu nhập lại không đúng");
    }
    callback();
  };

  const { getFieldDecorator } = props.form;
  return (
    <Layout>
      <Header style={{ background: "none" }} />
      <Content className="register">
        <Row type="flex" justify="center">
          <Col span={24} className="register-title">
            <span>Đăng ký dùng thử</span>
          </Col>
          <Col xs={24} sm={24} md={18} lg={12}>
            <Form colon={false}>
              <Form.Item {...form_style} label="Ngôn ngữ">
                {getFieldDecorator("language", {
                  rules: [
                    {
                      required: true,
                      message: "Chưa chọn ngôn ngữ!"
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio.Button value="vi">Vietnam</Radio.Button>
                    <Radio.Button value="en">United States</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item {...form_style} label="Mô hình kinh doanh">
                {getFieldDecorator("business_type", {
                  rules: [
                    {
                      required: true,
                      message: "Chưa chọn mô hình kinh doanh!"
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio value={0}>Cửa hàng</Radio>
                    <Radio value={1}>Quán ăn / uống / quầy ba</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item {...form_style} label="Họ tên">
                {getFieldDecorator("fullname", {
                  rules: [
                    {
                      required: true,
                      message: "Chưa nhập thông tin họ tên!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item {...form_style} label="Số điện thoại">
                {getFieldDecorator("phonenumber", {
                  rules: [
                    {
                      required: true,
                      message: "Chưa nhập thông tin số điện thoại!"
                    }
                  ]
                })(
                  <Row gutter={12}>
                    <Col span={12}>
                      <Input />
                    </Col>
                    <Col span={12} className="register-form-info">
                      <div>
                        <span>(Lưu ý: số điện thoại là tài khoản</span>
                      </div>
                      <div>
                        <span>đăng nhập của bạn sau khi đăng ký)</span>
                      </div>
                    </Col>
                  </Row>
                )}
              </Form.Item>
              <Row type="flex" justify="end" gutter={12}>
                <Col xs={24} sm={8} md={8} lg={8}>
                  <Form.Item {...divide_form_layout} label="Mật khẩu">
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Chưa nhập mật khẩu!"
                        }
                      ]
                    })(<Input type="password" />)}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                  <Form.Item {...divide_form_layout} label="Xác nhận mật khẩu">
                    {getFieldDecorator("confirmPassword", {
                      rules: [
                        {
                          required: true,
                          message: "Chưa nhập lại mật khẩu!"
                        },
                        {
                          validator: comparePassword
                        }
                      ]
                    })(<Input type="password" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item {...form_style} label="Email">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Chưa nhập thông tin email!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item
                {...form_style}
                label="Tên miền"
                hasFeedback
                validateStatus="validating"
              >
                {getFieldDecorator("domain", {
                  rules: [
                    {
                      required: true,
                      message: "Chưa nhập thông tin tên miền!"
                    }
                  ]
                })(<Input addonAfter={domain_select} />)}
              </Form.Item>
            </Form>
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" onClick={onSubmit}>
              Tạo bản dùng thử
            </Button>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Form.create({})(Register);
