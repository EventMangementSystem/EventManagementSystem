package com.eventmanagement.serviceImpl;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;

import com.eventmanagement.custom_exceptions.ResourceNotFoundException;
import com.eventmanagement.entities.Payment;
import com.eventmanagement.repository.PaymentRepository;
import com.eventmanagement.service.TicketService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final PaymentRepository paymentRepository;

    @Override
    public byte[] generateTicket(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found"));

        try {

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            PdfWriter writer = new PdfWriter(outputStream);

            PdfDocument pdf = new PdfDocument(writer);

            Document document = new Document(pdf, PageSize.A4);

            document.setMargins(20, 20, 20, 20);

            Paragraph title = new Paragraph("EVENT MANAGEMENT SYSTEM")
                    .setBold()
                    .setFont(PdfFontFactory.createFont())
                    .setFontSize(22)
                    .setTextAlignment(TextAlignment.CENTER);

            Paragraph subtitle = new Paragraph("EVENT TICKET")
                    .setBold()
                    .setFontSize(16)
                    .setFontColor(ColorConstants.BLUE)
                    .setTextAlignment(TextAlignment.CENTER);

            document.add(title);
            document.add(subtitle);

            document.add(new Paragraph("\n"));

            Table table = new Table(2);

            table.setWidth(500);

            table.addCell(createHeaderCell("Customer"));
            table.addCell(createValueCell(
                    payment.getBooking().getCustomer().getName()));

            table.addCell(createHeaderCell("Booking ID"));
            table.addCell(createValueCell(
                    String.valueOf(payment.getBooking().getId())));

            table.addCell(createHeaderCell("Event"));
            table.addCell(createValueCell(
                    payment.getBooking().getEvent().getTitle()));

            table.addCell(createHeaderCell("Category"));
            table.addCell(createValueCell(
                    payment.getBooking().getEvent().getCategory().name()));

            table.addCell(createHeaderCell("Venue"));
            table.addCell(createValueCell(
                    payment.getBooking().getEvent().getVenue()));

            table.addCell(createHeaderCell("City"));
            table.addCell(createValueCell(
                    payment.getBooking().getEvent().getCity()));

            table.addCell(createHeaderCell("Date"));
            table.addCell(createValueCell(
                    payment.getBooking().getEvent()
                            .getEventDate().toString()));

            table.addCell(createHeaderCell("Time"));
            table.addCell(createValueCell(
                    payment.getBooking().getEvent()
                            .getEventTime().toString()));

            table.addCell(createHeaderCell("Tickets"));
            table.addCell(createValueCell(
                    String.valueOf(
                            payment.getBooking().getNumberOfTickets())));

            table.addCell(createHeaderCell("Amount"));
            table.addCell(createValueCell(
                    "₹ " + payment.getAmount()));

            table.addCell(createHeaderCell("Payment Status"));
            table.addCell(createValueCell(
                    payment.getPaymentStatus().name()));

            table.addCell(createHeaderCell("Transaction ID"));
            table.addCell(createValueCell(
                    payment.getTransactionId()));

            document.add(table);

            document.add(new Paragraph("\n"));

            QRCodeWriter qrCodeWriter = new QRCodeWriter();

            BitMatrix bitMatrix =
                    qrCodeWriter.encode(
                            payment.getTransactionId(),
                            BarcodeFormat.QR_CODE,
                            250,
                            250);

            ByteArrayOutputStream qrOutput =
                    new ByteArrayOutputStream();

            MatrixToImageWriter.writeToStream(
                    bitMatrix,
                    "PNG",
                    qrOutput);

            Image qr =
                    new Image(
                            ImageDataFactory.create(
                                    qrOutput.toByteArray()));

            qr.setHorizontalAlignment(HorizontalAlignment.CENTER);

            document.add(qr);

            document.add(new Paragraph("\n"));

            Paragraph footer =
                    new Paragraph(
                            "Thank you for booking with Event Management System.\nPlease carry this ticket during the event.")
                            .setTextAlignment(TextAlignment.CENTER)
                            .setBold();

            document.add(footer);

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(e);
        }
    }

        private Cell createHeaderCell(String text) {

            return new Cell()
                    .add(new Paragraph(text).setBold())
                    .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                    .setBorder(new SolidBorder(ColorConstants.BLACK, 1));
        }

        private Cell createValueCell(String text) {

            return new Cell()
                    .add(new Paragraph(text))
                    .setBorder(new SolidBorder(ColorConstants.BLACK, 1));
        }

}