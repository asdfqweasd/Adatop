import { cosmic } from "@/cosmic/client";
import { QRCodePage } from "./QRCodePage";

export default async function QRCode() {
  const { object: qrcode } = await cosmic.objects
    .findOne({
      type: "qrcode",
      slug: "qrcode",
    })
    .props("slug,title,metadata,type")
    .depth(1);

  if (!qrcode) return <div>Something went wrong</div>;

  return <QRCodePage qrcode={qrcode} />;
}
