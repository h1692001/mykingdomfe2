import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { formatCurrency } from '../../../utils/convertPrice';
const HoaDon = ({ currentPdf }) => {
  function formatDateToCustomString(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
  }
  return (
    <Document>
      <Page
        style={{
          paddingTop: '35px',
          paddingBottom: '65px',
          paddingHorizontal: '35px',
        }}
      >
        <Text style={{ display: 'block' }}>Ten nguoi nhan: {currentPdf?.name}</Text>
        <Text style={{ display: 'block' }}>Dia chi: {currentPdf?.address}</Text>
        <Text style={{ display: 'block' }}>Ngay thanh toan: {formatDateToCustomString(new Date(currentPdf?.createdAt))}</Text>
        <Text style={{ display: 'block', marginTop: '10px', fontWeight: '500' }}>Danh sach san pham: </Text>
        {currentPdf?.billItemDTOS?.map((dt) => {
          return (
            <View>
              <View style={{ margin: '10px 0' }}>
                <View style={{ display: 'block' }}>
                  <Text style={{ display: 'block' }}>{dt.productDTO.name}</Text>
                </View>
                <View style={{ gap: '12px', display: 'flex', fontSize: '12px', }}>
                  <View >
                    <Text >So luong: {dt.amount}</Text>
                    <Text >Thanh tien: {formatCurrency(dt?.price)}VND</Text>
                  </View>
                  <View >
                  </View>
                </View>
              </View>

            </View>
          );
        })}
        <Text style={{ marginTop: '20px', fontWeight: '500' }}>Tong tien: {formatCurrency(currentPdf?.billItemDTOS?.reduce((acc, val) => (acc += val.price), 0))} VND</Text>
      </Page>
    </Document>
  );
};

export default HoaDon;
